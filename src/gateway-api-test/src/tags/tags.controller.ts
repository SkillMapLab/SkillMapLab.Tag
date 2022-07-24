import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ClientProxyTags } from 'src/common/proxy/client.proxy';
import { ITag } from 'src/common/interfaces';
import { TagDto } from './dtos/tag.dto';
import { MessageTagPatterns } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('api/v1/tags')
export class TagsController {
  constructor(private readonly clientProxy: ClientProxyTags) {}

  private clientProxyTag = this.clientProxy.getProxy();

  @Post()
  create(@Body() tagDto: TagDto): Observable<ITag> {
    console.log(tagDto);
    return this.clientProxyTag.send(MessageTagPatterns.CREATE, tagDto);
  }

  @Post('/batch')
  createBatch(@Body() tagDtos: TagDto[]): Observable<ITag> {
    return this.clientProxyTag.send(MessageTagPatterns.CREATE_BATCH, tagDtos);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tagDto: TagDto): Observable<ITag> {
    return this.clientProxyTag.send(MessageTagPatterns.UPDATE, {
      id,
      tagDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxyTag.send(MessageTagPatterns.DELETE, id);
  }
}
