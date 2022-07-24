import { Uuid } from './value-object/uuid.valueobject';

export abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(
    eventName: string,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.generate();
    //TODO: Calculate UTC
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }
}

export type DomainEventClass = {
  EVENT_NAME: string;
};
