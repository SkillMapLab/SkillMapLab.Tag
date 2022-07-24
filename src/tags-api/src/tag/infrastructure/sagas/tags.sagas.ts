import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CreatedTagIntegrationEvent } from 'src/tag/application/events/tag-created.event';
import { CreatedTagEvent } from 'src/tag/domain/events';


@Injectable()
export class TagsSagas {
  @Saga()
  tagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CreatedTagEvent),
        delay(1000),
        map((event) => {
            const command = new CreatedTagIntegrationEvent(event.id, event.key, event.name);
            console.log(command)
            return command;
        } )
      );
  }
}