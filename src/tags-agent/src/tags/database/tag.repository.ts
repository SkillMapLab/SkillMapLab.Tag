import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRepository } from 'src/common/repository';
import { Tag } from './models';
import { DatabaseException } from './database.exception';
import { TagStatus } from './models/tag.table';

@Injectable()
export class TagRepository implements IRepository<Tag> {
  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
  ) {}

  private async getById(id: string): Promise<Tag> {
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async insert(model: Tag): Promise<void> {
    try {
      await this.repository.insert(model);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async update(id: string, status: TagStatus): Promise<void> {
    const tag = await this.getById(id);

    if (!tag) throw new Error('Tag does not exists.');

    try {
      tag.status = status;

      await this.repository.save(tag);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const dataFound = await this.getById(id);

    if (!dataFound) throw new Error('Tag does not exists.');

    try {
      await this.repository.delete({ id });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }
}
