import { AggregateRoot } from '@nestjs/cqrs';

import { CreatedTagEvent, DeletedTagEvent, UpdatedTagEvent } from './events';

export class Tag extends AggregateRoot {

    constructor(public readonly id: string, public readonly key: string, public name: string, public status: number = 1) {
    super();

    this.id = id;
    this.key = key;
    this.name = name;
    
    this.apply(new CreatedTagEvent(this.id, this.key, this.name));

  }

  public static Create(id: string, key: string, name: string, description: string): Tag {
    return new Tag(id, key, name, 1);
  }

  public Update(name: string) {
    this.name = name;

    this.apply(new UpdatedTagEvent(this.name));
  }

  public Delete(): void {
    this.apply(new DeletedTagEvent(this.id, this.name))
  }
}