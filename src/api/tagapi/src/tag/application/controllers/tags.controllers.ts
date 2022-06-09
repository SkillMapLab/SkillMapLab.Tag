import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto, TagDtoInfo, UpdateTagDto } from '../dto';
import { TagService } from '../services';

@Controller('api/v1/tags')
export class TagsController {
  constructor(private tagService: TagService) { }

  @Get()
  async GetAll(): Promise<TagDtoInfo[]> {
    return await this.tagService.GetAll(1);
  }

  @Get(':id')
  async GetById(@Param('id') id: string): Promise<TagDtoInfo> {
    return await this.tagService.GetById(id);
  }

  @Get('getbykey/:key')
  async GetByKey(@Param('key') key: string): Promise<TagDtoInfo[]> {
    return await this.tagService.GetByKey(key);
  }

  @Post()
  async Create(@Body() tag: CreateTagDto): Promise<void> {
    await this.tagService.Create(tag);
  }

  @Post('multiple')
  async CreateMultiple(@Body() tags: CreateTagDto[]): Promise<void> {
    await this.tagService.CreateMultiple(tags);
  }

  @Put()
  async Update(@Body() tag: UpdateTagDto): Promise<void> {
    return await this.tagService.Update(tag);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.tagService.Delete(id);
  }
}
