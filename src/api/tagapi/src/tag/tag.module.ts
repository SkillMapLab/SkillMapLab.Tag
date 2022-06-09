import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TagsController } from './application';
import { TagsProfile } from './config';
import { TagRepository } from './infrastructure/database';
import { TagService } from './application/services';
import { CreateTagCommandHandler, DeleteTagCommandHandler, UpdateTagCommandHandler } from './application/commands/handlers';
import { CreatedTagEventHandler } from './application/events/handlers';
import { TagsSagas } from './infrastructure/sagas';

const CommandHandlers = [CreateTagCommandHandler, UpdateTagCommandHandler, DeleteTagCommandHandler]
const EventHandlers = [CreatedTagEventHandler]

@Module({
  imports: [CqrsModule],
  controllers: [TagsController],
  providers: [
    TagService,
    TagsProfile,
    TagRepository,
    TagsSagas,
    ...CommandHandlers,
    ...EventHandlers,],
})
export class TagModule { }
