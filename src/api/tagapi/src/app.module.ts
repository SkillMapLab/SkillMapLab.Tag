import { TagModule } from './tag/tag.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TagModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true, // disabled in production
        retryAttempts: parseInt(process.env.DATABASE_RETRY),
        retryDelay: parseInt(process.env.DATABASE_RETRYDELAY),
      }),
    }),
  ],
})
export class AppModule { }
