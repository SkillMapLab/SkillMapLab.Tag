import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { TagRepository } from 'src/tag/infrastructure/database';
import { CreateTagCommand } from '../create-tag.command';
import { TagDomain } from 'src/tag/domain';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateTagCommand)
export class CreateTagCommandHandler implements ICommandHandler<CreateTagCommand> {
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreateTagCommand): Promise<void> {
    const id = uuidv4();

    const tagDomain = TagDomain.Create(id, command.key, command.name, command.description);

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.Insert(tagMerged);

    tagMerged.commit();
  }

}