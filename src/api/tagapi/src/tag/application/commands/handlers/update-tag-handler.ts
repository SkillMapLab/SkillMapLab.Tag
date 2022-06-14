import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { UpdateTagCommand } from './../update-tag.command';

@CommandHandler(UpdateTagCommand)
export class UpdateTagCommandHandler implements ICommandHandler<UpdateTagCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: UpdateTagCommand): Promise<void> {
    const dataDomain = await this.tagRepository.GetById(command.id);

    const tagMerged = this.publisher.mergeObjectContext(dataDomain);

    tagMerged.Update(command.name, command.description);

    await this.tagRepository.Update(tagMerged.id, tagMerged);

    tagMerged.commit();

  }

}