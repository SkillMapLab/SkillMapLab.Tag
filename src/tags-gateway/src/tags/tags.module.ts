import { Module } from '@nestjs/common';

import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TagsController } from './tags.controller';

@Module({
  imports: [ProxyModule],
  controllers: [TagsController],
  providers: [],
})
export class TagsModule {}
