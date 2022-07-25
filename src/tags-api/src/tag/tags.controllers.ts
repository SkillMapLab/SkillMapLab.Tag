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


  @Post('batch')
  async CreateBatch(@Body() tags: CreateTagDto[]): Promise<void> {
    await this.tagService.CreateBatch(tags);
  }

  @Put(':id')
  async ChangeTagName(@Param('id') id: string, @Body() tag: UpdateTagDto): Promise<void> {
    return await this.tagService.ChangeName(id, tag);
  }

  @Put(':id')
  async Enable(@Param('id') id: string): Promise<void> {
    return await this.tagService.Enable(id);
  }

  @Put(':id')
  async Disable(@Param('id') id: string): Promise<void> {
    return await this.tagService.Disable(id);
  }
}
