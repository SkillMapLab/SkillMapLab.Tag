import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Mapper } from '@automapper/core';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { TagRepository } from 'src/tag/infrastructure/database';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { TagDomain } from 'src/tag/domain';
import { DeleteTagCommand } from '../delete-tag.command';

@CommandHandler(DeleteTagCommand)
export class DeleteTagCommandHandler implements ICommandHandler<DeleteTagCommand>
{
  constructor(
    @InjectRepository(Tag) private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: DeleteTagCommand): Promise<void> {
    const tagModel = await this.tagRepository.FindById(command.id);

    const tagDomain = await this.mapper.mapAsync(tagModel, Tag, TagDomain);

    const tagMerged = this.publisher.mergeObjectContext(tagDomain);

    tagMerged.Delete();

    await this.tagRepository.Delete(tagMerged.id);

    tagMerged.commit();
  }

}