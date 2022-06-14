import { Injectable, Logger } from '@nestjs/common';
import { DaprClient } from 'dapr-client';

@Injectable()
export class DaprService {
  daprClient: DaprClient;
  private readonly logger = new Logger(DaprService.name);

  constructor() {
    const daprHost = process.env.DAPR_SIDECAR_HOST || '127.0.0.1';
    const daprPort = process.env.DAPR_SIDECAR_PORT || '3500';

    this.logger.log(`Initializing DaprClient("${daprHost}", ${daprPort})`);
    this.daprClient = new DaprClient(daprHost, daprPort);
  }
}