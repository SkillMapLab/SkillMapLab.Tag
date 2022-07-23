import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags/models/tag.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Tag],
      synchronize: true,
    }),
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
