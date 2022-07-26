import { IsNotEmpty, IsString } from 'class-validator';
import { TagEvent } from './tag.event';

export class TagCreatedEvent extends TagEvent {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(id: string, key: string, name: string) {
    super(id);
    this.key = key;
    this.name = name;
  }
}
