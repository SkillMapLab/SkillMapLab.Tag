import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(buildValidationPipe());
  // this is added here to process Dapr.IO publish with content-header: appliction/cloudevents+json. If not included body of post request will be {}
  app.use(bodyParser.json({ type: 'application/cloudevents+json' }));
  // add this as other post with content-type: json will fail like login will fail due to bodyPaser code above
  app.use(bodyParser.json());
  await app.listen(3000);
}
bootstrap();

const buildValidationPipe = (): ValidationPipe => {
  const isDev = process.env.NEST_ENV !== 'production' ? true : false;

  const options: ValidationPipeOptions = {
    disableErrorMessages: isDev,
  };

  return new ValidationPipe(options);
};
