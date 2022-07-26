import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { TagEvents } from 'src/common/constants';
import { TagRepository } from 'src/tags/database';
import { Tag } from 'src/tags/database/models';
import { TagStatus } from 'src/tags/database/models/tag.table';
import { TagCreatedEvent } from '../tag-created.event';
import { ClientProxyTagEvents } from '../../../common/proxy/client.proxy';
import { EventType } from 'src/tags/dtos/event.dto';
import { AbstractTagEventListener } from './tag-event.listener';

@Injectable()
export class TagCreatedListener extends AbstractTagEventListener {
  constructor(
    readonly repository: TagRepository,
    readonly clientProxyTagEvents: ClientProxyTagEvents,
  ) {
    super(clientProxyTagEvents);
  }

  @OnEvent(TagEvents.CREATED, { async: true })
  async handleOn(payload: TagCreatedEvent) {
    const tableProjection = new Tag();
    tableProjection.id = payload.id;
    tableProjection.key = payload.key;
    tableProjection.name = payload.name;
    tableProjection.status = TagStatus.ACTIVE;

    await this.repository.insert(tableProjection);

    await this.publishEvent(EventType.CREATED, payload);
  }
}
