import { Controller, Get } from '@nestjs/common';

@Controller('tags')
export class TagsController {
  @Get()
  findAll(): string {
    return 'This action returns all tags';
  }
}
