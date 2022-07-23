import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CreatedTagEvent } from 'src/tag/application/events';

@Injectable()
export class TagsSagas {
  @Saga()
  tagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CreatedTagEvent),
        delay(1000),
        map(event => {
          // Logic here
          return event.id;
        }),
      );
  }
}