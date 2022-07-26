import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TagEvents } from 'src/common/constants';

import { ClientProxyTagEvents } from 'src/common/proxy/client.proxy';
import { TagRepository } from 'src/tags/database';
import { EventType } from 'src/tags/dtos/event.dto';
import { AbstractTagEventListener } from './tag-event.listener';
import { TagDisabledEvent } from '../tag-disabled.event';
import { TagStatus } from 'src/tags/database/models/tag.table';

@Injectable()
export class TagDisabledListener extends AbstractTagEventListener {
  constructor(
    private readonly repository: TagRepository,
    readonly clientProxyTagEvents: ClientProxyTagEvents,
  ) {
    super(clientProxyTagEvents);
  }

  @OnEvent(TagEvents.DISABLED, { async: true })
  async handleOn(payload: TagDisabledEvent) {
    await this.repository.update(payload.id, TagStatus.DISABLED);

    await this.publishEvent(EventType.DISABLED, payload);
  }
}
