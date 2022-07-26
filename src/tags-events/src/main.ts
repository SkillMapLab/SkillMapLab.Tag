import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonQueues } from './common/constants';
import { CommonInterceptors } from './common/interceptors';
import { CommonFilters } from './common/filters';

const serverRMQ = process.env.RMQ_URL;
const queue = CommonQueues.TagsEventsQueue;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [serverRMQ],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.useGlobalInterceptors(...CommonInterceptors);

  app.useGlobalFilters(...CommonFilters);

  await app.listen();

  console.log(
    `Tags Agent Microservice is listening => Server: ${serverRMQ}, queue: ${queue}`,
  );
}
bootstrap();
