import { Module } from '@nestjs/common';
import { ClientProxyTags } from './client.proxy';

@Module({
  providers: [ClientProxyTags],
  exports: [ClientProxyTags],
})
export class ProxyModule {}
