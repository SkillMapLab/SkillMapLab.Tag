import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from 'src/tag/infrastructure/database';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { TagDtoInfo } from '../../dto';
import { GetTagByKeyQuery } from '../get-tagbykey.query';

@QueryHandler(GetTagByKeyQuery)
export class GetTagByKeyQueryHandler implements IQueryHandler<GetTagByKeyQuery> {

  constructor(
    @InjectRepository(Tag) private tagRepository: TagRepository,
    @InjectMapper('classes') private mapper: Mapper) { }

  async execute(query: GetTagByKeyQuery): Promise<TagDtoInfo> {

    const data = await this.tagRepository.FindByKey(query.key);

    return await this.mapper.mapAsync(data, Tag, TagDtoInfo);
  }
}