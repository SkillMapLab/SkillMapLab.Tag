import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MessageTagPatterns } from 'src/common/constants';
import { CreateTagDto } from './dtos';
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

  @MessagePattern(MessageTagPatterns.ENABLE)
  enable(@Payload() id: string) {
    return this.tagService.enable(id);
  }

  @MessagePattern(MessageTagPatterns.DISABLE)
  disable(@Payload() id: string) {
    return this.tagService.disable(id);
  }

  @MessagePattern(MessageTagPatterns.DELETE)
  delete(@Payload() id: string) {
    return this.tagService.delete(id);
  }
}
