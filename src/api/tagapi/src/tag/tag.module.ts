import { Module } from '@nestjs/common';
import { TagsController, TagsService } from './application';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagModule { }
