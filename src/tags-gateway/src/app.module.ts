import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
