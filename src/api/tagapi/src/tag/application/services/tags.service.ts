import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    return await this.mapper.mapArrayAsync(data, Tag, TagDtoInfo)
  }

  async findOne(id: string): Promise<TagDtoInfo> {
    const data = await this.tagRepository.findOneBy({ id });

    return await this.mapper.mapAsync(data, Tag, TagDtoInfo)
  }

  async findByKey(key: string): Promise<TagDtoInfo> {
    const data = await this.tagRepository.findOneBy({ key });

    return await this.mapper.mapAsync(data, Tag, TagDtoInfo)
  }

  async AddOne(tag: CreateTagDto): Promise<void> {

    const tagToAdd = await this.mapper.mapAsync(tag, CreateTagDto, Tag);

    await this.tagRepository.insert(tagToAdd);
  }

  async AddMultiple(tags: CreateTagDto[]): Promise<void> {
    const tagToAdd = await this.mapper.mapArrayAsync(tags, CreateTagDto, Tag);

    await this.tagRepository.insert(tags);
  }

  async update(id: string, tag: UpdateTagDto): Promise<void> {
    await this.tagRepository.update({ id }, tag)
  }

  async delete(id: string): Promise<void> {
    await this.tagRepository.delete({ id });
  }
}
