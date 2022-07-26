import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { Tag } from './database/models/tag.table';
import { TagRepository } from './database';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsResolver, TagsService, TagRepository],
})
export class TagsModule {}
