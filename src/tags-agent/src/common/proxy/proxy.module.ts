import { Module } from '@nestjs/common';
import { ClientProxyTagEvents } from './client.proxy';

@Module({
  providers: [ClientProxyTagEvents],
  exports: [ClientProxyTagEvents],
})
export class ProxyModule {}
