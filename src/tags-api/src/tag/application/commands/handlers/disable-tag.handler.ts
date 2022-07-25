import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { DisableTagCommand } from '../disable-tag.command';

@CommandHandler(DisableTagCommand)
export class DisableTagCommandHandler implements ICommandHandler<DisableTagCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: DisableTagCommand): Promise<void> {
    const tagDomain = await this.tagRepository.GetById(command.id);   

    tagDomain.Disable();

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.Delete(tagDomain.id.value);

    tagMerged.commit();
  }

}