import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { UpdateTagCommand } from './../update-tag.command';
import { TagDomain } from 'src/tag/domain';

@CommandHandler(UpdateTagCommand)
export class UpdateTagCommandHandler implements ICommandHandler<UpdateTagCommand>
{
  constructor(
    @InjectRepository(Tag) private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: UpdateTagCommand): Promise<void> {
    const tagModel = await this.tagRepository.FindById(command.id);

    const tagDomain = await this.mapper.mapAsync(tagModel, Tag, TagDomain);

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    tagMerged.Update(tagDomain.name, tagDomain.description);

    await this.tagRepository.Update(tagMerged.id, tagMerged);

    tagMerged.commit();

  }

}