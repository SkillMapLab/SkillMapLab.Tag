import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from 'src/tag/infrastructure/database';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { TagDtoInfo } from '../../dto';
import { GetTagsQuery } from '../get-tags.query';

@QueryHandler(GetTagsQuery)
export class GetTagsQueryHandler implements IQueryHandler<GetTagsQuery> {

  constructor(
    @InjectRepository(Tag) private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagsQuery): Promise<TagDtoInfo[]> {

    const data = await this.tagRepository.FindAll(1);

    return await this.mapper.mapArrayAsync(data, Tag, TagDtoInfo);
  }
}