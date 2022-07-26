import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DatabaseException } from './database.exception';
import { IRepository } from 'src/common/repository';
import { Tag } from './models/tag.table';

@Injectable()
export class TagRepository implements IRepository<Tag> {
  constructor(
    @InjectRepository(Tag)
    private repository: Repository<Tag>,
  ) {}

  async getAll(): Promise<Tag[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async getById(id: string): Promise<Tag> {
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async getByKey(key: string): Promise<Tag[]> {
    try {
      return await this.repository.findBy({ key });
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async insert(tag: Tag): Promise<void> {
    try {
      await this.repository.insert(tag);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async insertBatch(tags: Tag[]): Promise<void> {
    try {
      await this.repository.insert(tags);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }

  async update(id: string, tag: Tag): Promise<void> {
    const dataFound = await this.getById(id);

    if (!dataFound) throw new Error('Tag does not exists.');

    try {
      await this.repository.update({ id }, tag);
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
