import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagDtoInfo } from '../dto/info-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { TagsService } from '../services/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) { }

  @Get()
  async findAll(): Promise<TagDtoInfo[]> {
    return await this.tagsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TagDtoInfo> {
    return await this.tagsService.findOne(id);
  }

  @Post()
  async create(@Body() tag: CreateTagDto): Promise<void> {
    await this.tagsService.AddOne(tag);
  }

  @Post('multiple')
  async createMultiple(@Body() tags: CreateTagDto[]): Promise<void> {
    await this.tagsService.AddMultiple(tags);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() tag: UpdateTagDto): Promise<void> {
    return await this.tagsService.update(id, tag);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.tagsService.delete(id);
  }
}
