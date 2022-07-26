export enum EventType {
  CREATED = 'CREATED',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

export class TagEventDto {
  id: string;
  aggregateId: string;
  eventType: string;
  eventName: string;
  data: string;
  createdAt: Date;
  createdBy: string;
}
