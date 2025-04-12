import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppActions} from "./app.actions";
import { CategoryActions } from "../categoryStore/category.actions";
import { StatusActions } from "../statusStore/status.actions";
import { TaskActions } from "../taskStore/task.actions";
import { mergeMap, catchError, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { UserActions } from "../userStore/user.actions";



@Injectable()
export class AppEffects {

  loadAllData$;
  clearData$;

  constructor(private actions$: Actions, private router:Router) {
    this.loadAllData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AppActions.appLoadAllData),
        mergeMap(({ userId }) => {
          console.log('Loading data for user ID:', userId);
          return of(
            CategoryActions.categoryGetCategoryesByUserId({ userId }),
            StatusActions.statusGetStatusesByUserId({ userId }),
            TaskActions.taskGetTasksByUserId({ userId })
          ).pipe(
            mergeMap(action => of(action)) 
          );
        }),
        tap(() => {
          console.log("Data loaded successfully");
          this.router.navigate(['/main']);
        }),
        catchError((error) => {
          console.error('Failed to load data:', error);
          return of(AppActions.appLoadAllDataFailure({ error }));
        })
      )
    );
    this.clearData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AppActions.appClearData),
        mergeMap(() => {
          return of(
            UserActions.userLogout({ message: "" }),
            CategoryActions.categoryCategoryClear(),
            StatusActions.statusStatusClear(),
            TaskActions.taskTaskClear(),
          ).pipe(
            mergeMap(action => of(action)),
          );
        })
      )
    )
  }
}
