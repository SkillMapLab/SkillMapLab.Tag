import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { CommonQueues } from '../constants';

@Injectable()
export class ClientProxyTagEvents {
  constructor(private readonly config: ConfigService) {}

  getProxy(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get('RMQ_URL')],
        queue: CommonQueues.TagsEventsQueue,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
}
