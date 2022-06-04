import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController, TagsService } from './application';
import { TagsProfile } from './config';
import { Tag } from './infrastructure/database/schemas';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService, TagsProfile],
})
export class TagModule { }
