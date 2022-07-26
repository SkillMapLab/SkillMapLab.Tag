import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ClientProxyTagEvents } from 'src/common/proxy/client.proxy';
import { EventType, TagEventDto } from '../../dtos/event.dto';
import { MessageTagEventsPatterns } from '../../../common/constants';

@Injectable()
export abstract class AbstractTagEventListener {
  constructor(readonly clientProxyTagEvents: ClientProxyTagEvents) {}

  readonly clientProxy = this.clientProxyTagEvents.getProxy();

  public async publishEvent(eventType: EventType, event: any) {
    const dto = new TagEventDto();
    event.id = uuidv4();
    event.aggregateId = event.aggregateId;
    event.eventType = eventType;
    event.eventName = event.name;
    event.data = JSON.stringify(event);
    event.createdAt = new Date();
    event.createdBy = 'tags-agent';

    await this.clientProxy.send(MessageTagEventsPatterns.CREATE, dto);
  }
}
