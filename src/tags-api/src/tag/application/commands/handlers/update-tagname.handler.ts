import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { ChangeTagNameCommand } from '../update-tagname.command';
import { Name } from 'src/tag/domain/name.domain';

@CommandHandler(ChangeTagNameCommand)
export class UpdateTagCommandHandler implements ICommandHandler<ChangeTagNameCommand>
{
  constructor(
    private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: ChangeTagNameCommand): Promise<void> {
    const tagDomain = await this.tagRepository.GetById(command.id);

    tagDomain.ChangeName(new Name(command.name));

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    await this.tagRepository.Update(tagDomain.id.value, tagDomain);

    tagMerged.commit();
  }
}