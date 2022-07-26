import { TagEvent } from './tag.event';

export class TagDisabledEvent extends TagEvent {
  constructor(id: string) {
    super(id);
  }
}
