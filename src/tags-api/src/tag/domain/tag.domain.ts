import { AggregateRoot } from '@nestjs/cqrs';

import { CreatedTagEvent, DeletedTagEvent, UpdatedTagEvent } from './events';
import { TagException } from './exception.domain';
import { Id } from './id.domain';
import { Key } from './key.domain';
import { Name } from './name.domain';


export enum TagStatus {
    Active = 1,
    Inactive = 0,
}

export class Tag extends AggregateRoot {

    constructor(public readonly id: Id, 
                public readonly key: Key, 
                public name: Name, 
                public status: TagStatus = TagStatus.Active) {
    super();

    this.id = id;
    this.key = key;
    this.name = name;
    
    this.apply(new CreatedTagEvent(this.id.value, this.key.value, this.name.value));
  }

  public static Create(id: Id, key: Key, name: Name): Tag {
    return new Tag(id, key, name, 1);
  }

  public ChangeName(name: Name) {
    if (!this.status) 
      throw new TagException(`Tag ${this.name.value} for key ${this.key.value} cannot be changed due it is inactive`);

    this.name = name;

    this.apply(new UpdatedTagEvent(this.id.value, this.key.value, this.name.value));
  }

  public Disable(): void {
    if (!this.status) 
      throw new TagException(`Tag ${this.name.value} for key ${this.key.value} is already inactive`);

    this.status = TagStatus.Inactive;

    this.apply(new DeletedTagEvent(this.id.value, this.key.value, this.name.value))
  }

  public Enable(): void {
    if (this.status) 
      throw new TagException(`Tag ${this.name.value} for key ${this.key.value} is already avtive`);

    this.status = TagStatus.Active;

    this.apply(new DeletedTagEvent(this.id.value, this.key.value, this.name.value))
  }
}