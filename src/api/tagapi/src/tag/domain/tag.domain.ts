import { AggregateRoot } from '@nestjs/cqrs';

import { CreatedTagEvent, DeletedTagEvent, UpdatedTagEvent } from '../application/events';

export class Tag extends AggregateRoot {

  constructor(public readonly id: string, public readonly key: string, public name: string, public description: string = '') {
    super();

    this.id = id;
    this.key = key;
    this.name = name;
    this.description;

    this.apply(new CreatedTagEvent(this.id, this.key, this.name, this.description));

  }

  public static Create(id: string, key: string, name: string, description: string): Tag {
    return new Tag(id, key, name, description);
  }

  public Update(name: string, description: string) {
    this.name = name;
    this.description = description;

    this.apply(new UpdatedTagEvent(this.name, this.description));
  }

  public Delete(): void {
    this.apply(new DeletedTagEvent(this.id, this.name))
  }
}