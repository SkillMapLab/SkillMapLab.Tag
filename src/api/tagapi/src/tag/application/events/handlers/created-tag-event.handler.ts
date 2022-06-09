
import { CreatedTagEvent } from "../created-tag.event";
import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { TagRepository } from "src/tag/infrastructure/database";

@EventsHandler(CreatedTagEvent)
export class CreatedTagEventHandler implements IEventHandler<CreatedTagEvent> {
  constructor(private repository: TagRepository, private eventBus: EventBus) { }

  async handle(event: CreatedTagEvent) {
    //Create an integration event
    console.log("Event fired")
  }
}