import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto, TagDtoInfo, UpdateTagDto } from './application/dto';
import { TagService } from './tag.service';


@Controller('api/v1/tags')
export class TagsController {
  constructor(private tagService: TagService) { }

  @Get()
  async getAll(): Promise<TagDtoInfo[]> {
    return await this.tagService.getAll(1);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TagDtoInfo> {
    return await this.tagService.getById(id);
  }

  @Get('getbykey/:key')
  async getByKey(@Param('key') key: string): Promise<TagDtoInfo[]> {
    return await this.tagService.getByKey(key);
  }

  @Post()
  async create(@Body() tag: CreateTagDto): Promise<void> {
     await this.tagService.create(tag);
  }


  @Post('batch')
  async createBatch(@Body() tags: CreateTagDto[]): Promise<void> {
    await this.tagService.createBatch(tags);
  }

  @Put(':id')
  async changeTagName(@Param('id') id: string, @Body() tag: UpdateTagDto): Promise<void> {
    return await this.tagService.changeName(id, tag);
  }

  @Put(':id')
  async enable(@Param('id') id: string): Promise<void> {
    return await this.tagService.enable(id);
  }

  @Put(':id')
  async disable(@Param('id') id: string): Promise<void> {
    return await this.tagService.disable(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.tagService.delete(id);
  }
}
