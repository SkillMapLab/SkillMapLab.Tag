import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TagsController } from './application';
import { TagsProfile } from './config';
import { Tag, TagRepository } from './infrastructure/database';
import { TagService } from './application/services';
import { TagsSagas } from './infrastructure/sagas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [
    TagService,
    TagsProfile,
    TagRepository,
    TagsSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers],
})
export class TagModule { }
