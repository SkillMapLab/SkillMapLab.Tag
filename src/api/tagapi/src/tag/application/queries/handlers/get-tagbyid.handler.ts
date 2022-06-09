import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from 'src/tag/infrastructure/database';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { TagDtoInfo } from '../../dto';
import { GetTagByIdQuery } from '../get-tagbyid.query';

@QueryHandler(GetTagByIdQuery)
export class GetTagByIdQueryHandler implements IQueryHandler<GetTagByIdQuery> {

  constructor(
    @InjectRepository(Tag) private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagByIdQuery): Promise<TagDtoInfo> {

    const data = await this.tagRepository.FindById(query.id);

    return await this.mapper.mapAsync(data, Tag, TagDtoInfo);
  }
}