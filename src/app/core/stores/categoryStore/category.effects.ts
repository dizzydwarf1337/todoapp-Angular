import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {




  constructor(private actions$: Actions) {}
}
