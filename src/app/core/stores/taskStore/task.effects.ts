import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { TaskActions } from './task.actions';

@Injectable()
export class TaskEffects {




  constructor(private actions$: Actions) {}
}
