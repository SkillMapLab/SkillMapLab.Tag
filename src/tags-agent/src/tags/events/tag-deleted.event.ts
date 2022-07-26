import { TagEvent } from './tag.event';

export class TagDeletedEvent extends TagEvent {
  constructor(id: string) {
    super(id);
  }
}
