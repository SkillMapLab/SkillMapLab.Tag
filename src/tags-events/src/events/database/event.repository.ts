import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRepository } from 'src/common/repository';
import { Event } from './tables';
import { DatabaseException } from './database.exception';

@Injectable()
export class EventRepository implements IRepository<Event> {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  async insert(entity: Event): Promise<void> {
    try {
      await this.repository.insert(entity);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
  }
}
