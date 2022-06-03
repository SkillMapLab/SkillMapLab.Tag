import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagDtoInfo } from '../dto/info-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagsService {
  private readonly tags: TagDtoInfo[];

  async findAll(): Promise<TagDtoInfo[]> {
    return null;
  }

  async findOne(id: string): Promise<TagDtoInfo> {
    return null;
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
