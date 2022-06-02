import { Module } from '@nestjs/common';
import { TagsController } from './application/controllers/tags.controllers';
import { TagsService } from './application/tags.service';

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [TagsService],
})
export class AppModule {}
