import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonQueues } from './common/constants';
import { CommonInterceptors } from './common/interceptors';
import { CommonFilters } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: CommonQueues.TagsQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalInterceptors(...CommonInterceptors);
  app.useGlobalFilters(...CommonFilters);

  await app.listen();
}
bootstrap();
