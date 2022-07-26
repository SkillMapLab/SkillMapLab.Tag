import { TagEvent } from './tag.event';

export class TagEnabledEvent extends TagEvent {
  constructor(id: string) {
    super(id);
  }
}
