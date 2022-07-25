import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { EnableTagCommand } from '../enable-tag.command';

@CommandHandler(EnableTagCommand)
export class EnableTagCommandHandler implements ICommandHandler<EnableTagCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: EnableTagCommand): Promise<void> {
    const tagDomain = await this.tagRepository.getById(command.id);   

    tagDomain.Enable();

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.update(tagDomain.id.value, tagDomain);

    tagMerged.commit();
  }

}