import { Injectable } from '@nestjs/common';
import { TagRepository } from './database';
import { TagsArgs } from './dto/tag.args';
import { TagInput } from './dto/tag.input';
import { Tag } from './models/tag.model';

@Injectable()
export class TagsService {
  constructor(private readonly repository: TagRepository) {}

  async getAll(args: TagsArgs): Promise<Tag[]> {
    return await this.repository.getAll();
  }

  async getById(id: string): Promise<Tag> {
    return await this.repository.getById(id);
  }

  async getByKey(key: string): Promise<Tag[]> {
    return await this.repository.getByKey(key);
  }

  async create(tag: TagInput): Promise<Tag> {
    const tagTable = new Tag();
    tagTable.key = tag.key;
    tagTable.name = tag.name;
    tagTable.status = 1;

    await this.repository.insert(tagTable);

    return tagTable;
  }

  async update(id: string, tag: TagInput): Promise<Tag> {
    const tagTable = await this.getById(id);
    tagTable.name = tag.name;
    tagTable.status = tag.status;

    await this.repository.update(id, tagTable);

    return tagTable;
  }

  async delete(id: string): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
