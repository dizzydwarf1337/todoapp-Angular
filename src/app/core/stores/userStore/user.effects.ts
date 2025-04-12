import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';  // Импортируем необходимые операторы
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { LoginDto } from '../../Dtos/Auth/loginDto';
import { ApiService } from '../../services/apiService/api.service';
import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { ApiResponse } from '../../models/ApiResponse';
import { RegisterDto } from '../../Dtos/Auth/registerDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppActions } from '../appStore/app.actions';

@Injectable()
export class UserEffects {

  login$;
  logout$;
  register$;
  delete$;
  constructor(
    private apiService: ApiService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private store: Store
  ) {


    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.userLogin),
        switchMap((loginDto: LoginDto) =>
          this.apiService.Auth.Login(loginDto).pipe(
            mergeMap((response: ApiResponse<User>) => {
              if (response.isSuccess) {
                const user = response.value;
                localStorage.setItem('todo-user', JSON.stringify(user));
                this.snackBar.open("Logged in successfully", "", {
                  duration: 3000,
                  horizontalPosition: 'right', 
                  panelClass: ['snackbar-success'] 
                });
                return [
                  AppActions.appLoadAllData({ userId: user.id }),
                  UserActions.userLoginSuccess(user),

                ];
              } else {
                this.snackBar.open(response.error, "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return [ UserActions.userLoginFailure({ error: response.error })];
              }
            }),
            catchError((error) => {
              this.snackBar.open("Wrong password or username", "", {
                duration: 3000,
                horizontalPosition: 'right',
                panelClass: ['snackbar-error']
              });
              return of(UserActions.userLoginFailure({ error }));
            })
          )
        )
      )
    );
    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.userLogout),
        tap(() => {
          localStorage.removeItem('todo-user');
          this.snackBar.open("Logged out successfully","",{
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
        })
      ),
      { dispatch: false }
    );

    this.register$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.userRegister),
        switchMap((registerDto: RegisterDto) =>
          this.apiService.Auth.Register(registerDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Signed up successfully", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return UserActions.userRegisterSuccess({ message: response.value })
              }
              else {
                this.snackBar.open(response.error, "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return UserActions.userRegisterFailure({ error: response.error });
              }
            }),
            catchError((error) => {
              this.snackBar.open(error, "", {
                duration: 3000,
                horizontalPosition: 'right',
                panelClass: ['snackbar-error']
              });
              return of(UserActions.userRegisterFailure({ error }))
            })
          )
        )
      )
    );
    this.delete$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.userDelete),
        switchMap(({ userId }) =>
          this.apiService.Users.DeleteUser(userId).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                return UserActions.userDeleteSuccess({ message: response.value });
              } else {
                return UserActions.userDeleteFailure({ error: response.error });
              }
            }),
            catchError((error) => {
              return of(UserActions.userDeleteFailure({ error }));
            })
          )
        )
      )
    );




  }
}
