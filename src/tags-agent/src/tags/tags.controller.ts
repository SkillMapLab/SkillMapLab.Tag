import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MessageTagPatterns } from 'src/common/constants';
import { CreateTagDto, UpdateTagDto } from './dtos';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @MessagePattern(MessageTagPatterns.CREATE)
  create(@Payload() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @MessagePattern(MessageTagPatterns.CREATE_BATCH)
  createBatch(@Payload() createTagDtos: CreateTagDto[]) {
    return this.tagService.createBatch(createTagDtos);
  }

  @MessagePattern(MessageTagPatterns.UPDATE)
  update(@Payload() updateTagDto: UpdateTagDto) {
    return this.tagService.update(updateTagDto);
  }

  @MessagePattern(MessageTagPatterns.DELETE)
  delete(@Payload() id: string) {
    return this.tagService.delete(id);
  }
}
