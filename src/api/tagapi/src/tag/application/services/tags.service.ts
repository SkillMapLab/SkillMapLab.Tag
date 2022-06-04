import { Mapper } from '@automapper/core';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsProfile } from 'src/tag/config';
import { Tag } from 'src/tag/infrastructure/database/schemas';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagDtoInfo } from '../dto/info-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagsService {
  private readonly tags: TagDtoInfo[];

  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectMapper('classes') private mapper: Mapper) { }

  async findAll(): Promise<TagDtoInfo[]> {
    const data = await this.tagRepository.find();

    return this.mapper.mapArray(data, Tag, TagDtoInfo)
  }

  async findOne(id: string): Promise<TagDtoInfo> {
    const data = await this.tagRepository.findOneBy({ id });

    return this.mapper.map(data, Tag, TagDtoInfo)
  }

  async AddOne(tag: CreateTagDto): Promise<void> {
    // Do Nothing
  }

  async AddMultiple(tags: CreateTagDto[]): Promise<void> {
    // Do Nothing
  }

  async update(id: string, tag: UpdateTagDto): Promise<void> {
    // Do Nothing
  }

  async delete(id: string): Promise<void> {
    // Do Nothing
  }
}
