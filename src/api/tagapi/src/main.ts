import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(buildValidationPipe());
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
