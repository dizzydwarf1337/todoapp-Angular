import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { StatusActions } from './status.actions';

@Injectable()
export class StatusEffects {



  constructor(private actions$: Actions) {}
}
