import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TagEvents } from 'src/common/constants';

import { ClientProxyTagEvents } from 'src/common/proxy/client.proxy';
import { TagRepository } from 'src/tags/database';
import { EventType } from 'src/tags/dtos/event.dto';
import { AbstractTagEventListener } from './tag-event.listener';
import { TagStatus } from 'src/tags/database/models/tag.table';
import { TagEnabledEvent } from '../tag-enabled.event';

@Injectable()
export class TagEnabledListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: ClientProxyTagEvents,
  ) {
    super(clientProxyTagEvents);
  }

  @OnEvent(TagEvents.ENABLED, { async: true })
  async handleOn(payload: TagEnabledEvent) {
    await this.repository.update(payload.id, TagStatus.ACTIVE);

    await this.publishEvent(EventType.ENABLED, payload);
  }
}
