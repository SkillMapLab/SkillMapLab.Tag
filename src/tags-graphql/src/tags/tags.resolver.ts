import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { TagsArgs } from './dto/tag.args';
import { TagInput } from './dto/tag.input';
import { Tag } from './models/tag.model';
import { TagsService } from './tags.service';

const pubSub = new PubSub();

@Resolver((of) => Tag)
export class TagsResolver {
  constructor(private readonly tagService: TagsService) {}

  @Query((returns) => [Tag])
  async tags(@Args() tagsArgs: TagsArgs): Promise<Tag[]> {
    return await this.tagService.getAll(tagsArgs);
  }

  @Query((returns) => Tag)
  async tagById(@Args('id') id: string): Promise<Tag> {
    const tag = await this.tagService.getById(id);

    if (!tag) {
      throw new NotFoundException(id);
    }
    return tag;
  }

  @Query((returns) => [Tag])
  async tagByKey(@Args('key') key: string): Promise<Tag[]> {
    const tag = await this.tagService.getByKey(key);

    if (!tag) {
      throw new NotFoundException(key);
    }
    return tag;
  }

  @Mutation((returns) => Tag)
  async add(@Args('newTagData') newtagData: TagInput): Promise<Tag> {
    const tag = await this.tagService.create(newtagData);

    pubSub.publish('tagAdded', { tagAdded: tag });

    return tag;
  }

  @Mutation((returns) => Tag)
  async update(
    @Args('id') id: string,
    @Args('updateTagData') updateTagData: TagInput,
  ): Promise<Tag> {
    const tag = await this.tagService.update(id, updateTagData);

    return tag;
  }

  @Mutation((returns) => Boolean)
  async delete(@Args('id') id: string) {
    return this.tagService.delete(id);
  }

  @Subscription((returns) => Tag)
  tagAdded() {
    return pubSub.asyncIterator('tagAdded');
  }
}
