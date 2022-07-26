import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TagEvents } from 'src/common/constants';

import { ClientProxyTagEvents } from 'src/common/proxy/client.proxy';
import { TagRepository } from 'src/tags/database';
import { EventType } from 'src/tags/dtos/event.dto';
import { TagDeletedEvent } from '../tag-deleted.event';
import { AbstractTagEventListener } from './tag-event.listener';

@Injectable()
export class TagDeletedListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: ClientProxyTagEvents,
  ) {
    super(clientProxyTagEvents);
  }

  @OnEvent(TagEvents.ENABLED, { async: true })
  async handleOn(payload: TagDeletedEvent) {
    await this.repository.delete(payload.id);

    await this.publishEvent(EventType.DELETED, payload);
  }
}
