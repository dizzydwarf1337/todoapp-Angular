import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, switchMap, map, catchError } from 'rxjs/operators';  // Импортируем необходимые операторы
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { LoginDto } from '../../Dtos/Auth/loginDto';
import { ApiService } from '../../services/apiService/api.service';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable()
export class UserEffects {

  login$;
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private store: Store
  ) {


    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.userLogin),
        switchMap((loginDto: LoginDto) =>
          this.apiService.Auth.Login(loginDto).pipe(
            map((response: ApiResponse<User>) => {
              if (response.isSuccess) {
                const user = response.value;
                console.log(user);
                return UserActions.userLoginSuccess(user);
              } else {
                const error = response.error;
                return UserActions.userLoginFailure({ error });
              }
            }),
            catchError((error) => {

              return of(UserActions.userLoginFailure({ error }));
            })
          )
        )
      )
    );
  }
}
