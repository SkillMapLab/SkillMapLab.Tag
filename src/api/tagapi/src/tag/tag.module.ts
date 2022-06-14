import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TagsController } from './application';
import { TagService } from './application/services';
import { TagsSagas } from './infrastructure/sagas';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { TagsProfile } from './application/mapping';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModel } from 'src/tag/infrastructure/database/models';
import { TagRepository } from './infrastructure/database';

@Module({
  imports: [TypeOrmModule.forFeature([TagModel]), CqrsModule],
  controllers: [TagsController],
  providers: [
    TagService,
    TagsProfile,
    TagsSagas,
    TagRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers],
})
export class TagModule { }
