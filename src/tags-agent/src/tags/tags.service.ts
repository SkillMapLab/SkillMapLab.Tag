import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { TagCreatedEvent } from './events/tag-created.event';
import { CreateTagDto } from './dtos';
import { TagEvents } from 'src/common/constants';
import { TagEnabledEvent } from './events/tag-enabled.event';
import { TagDisabledEvent } from './events/tag-disabled.event';
import { TagDeletedEvent } from './events/tag-deleted.event';

@Injectable()
export class TagsService {
  private Url = this.configService.get('HTTP_USERAPI_URL');
  private MainPath = `${this.Url}/tags`;

  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  create(createTagDto: CreateTagDto): Observable<AxiosResponse<any>> {
    return this.httpService.post(this.MainPath, createTagDto).pipe(
      map((response) => {
        this.eventEmitter.emit(
          TagEvents.CREATED,
          new TagCreatedEvent(
            response.data.id,
            createTagDto.key,
            createTagDto.name,
          ),
        );
        return response;
      }),
    );
  }

  enable(id: string) {
    return this.httpService.put(`${this.MainPath}/enable/${id}`).pipe(
      map((response) => {
        this.eventEmitter.emit(
          TagEvents.ENABLED,
          new TagEnabledEvent(response.data.id),
        );
        return response;
      }),
    );
  }

  disable(id: string) {
    return this.httpService.put(`${this.MainPath}/disable/${id}`).pipe(
      map((response) => {
        this.eventEmitter.emit(
          TagEvents.DISABLED,
          new TagDisabledEvent(response.data.id),
        );
        return response;
      }),
    );
  }

  delete(id: string) {
    return this.httpService.delete(`${this.MainPath}/${id}`).pipe(
      map((response) => {
        this.eventEmitter.emit(
          TagEvents.DELETED,
          new TagDeletedEvent(response.data.id),
        );
        return response;
      }),
    );
  }
}
