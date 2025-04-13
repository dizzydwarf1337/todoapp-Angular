import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StatusActions } from './status.actions';
import { ApiService } from '../../services/apiService/api.service';
import { ApiResponse } from '../../models/ApiResponse';
import { Status } from '../../models/status';
import { CreateStatusDto } from '../../Dtos/Statuses/createStatusDto';
import { EditStatusDto } from '../../Dtos/Statuses/editStatusDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class StatusEffects {

  getStatusById$;
  getStatusesByUserId$;
  createStatus$;
  deleteStatus$;
  editStatus$;

  constructor(private actions$: Actions, private apiService: ApiService, private snackBar: MatSnackBar) {

    this.getStatusById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StatusActions.statusGetStatusById),
        switchMap(({ statusId}) =>
          this.apiService.Statuses.GetStatusById(statusId).pipe(
            map((response: ApiResponse<Status>) => {
              if (response.isSuccess) {
                return StatusActions.statusGetStatusByIdSuccess(response.value);
              } else {
                return StatusActions.statusGetStatusByIdFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(StatusActions.statusGetStatusByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );
    this.getStatusesByUserId$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StatusActions.statusGetStatusesByUserId),
        switchMap(({ userId }) => {
          console.log("Calling API for userId", userId);  
          return this.apiService.Statuses.GetStatusesByUserId(userId).pipe(
            map((response: ApiResponse<Status[]>) => {
              if (response.isSuccess) {
                return StatusActions.statusGetStatusesByUserIdSuccess({ statuses: response.value });
              } else {
                return StatusActions.statusGetStatusesByUserIdFailure({ error: response.error });
              }
            }),
            catchError((error) => {
              return of(StatusActions.statusGetStatusesByUserIdFailure({ error: error.message }));
            })
          );
        })
      )
    );
    this.createStatus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StatusActions.statusCreateStatus),
        switchMap((createStatusDto: CreateStatusDto) =>
          this.apiService.Statuses.CreateStatus(createStatusDto).pipe(
            map((response: ApiResponse<Status>) => {
              if (response.isSuccess) {
                this.snackBar.open("Status created", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return StatusActions.statusCreateStatusSuccess(response.value);
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return StatusActions.statusCreateStatusFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(StatusActions.statusCreateStatusFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteStatus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StatusActions.statusDeleteStatus),
        switchMap(({ statusId }) =>
          this.apiService.Statuses.DeleteStatus(statusId).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Status deleted", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return StatusActions.statusDeleteStatusSuccess({ statusId: statusId });
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return StatusActions.statusDeleteStatusFailure({ error: response.error });
              }
            }),
            catchError((error) => {
              this.snackBar.open("Seems like you have tasks with this status, delete them first, or change their status", "", {
                duration: 3000,
                horizontalPosition: 'right',
                panelClass: ['snackbar-error']
              });
             return  of(StatusActions.statusDeleteStatusFailure({ error: error.message }))
            }
            )
          )
        )
      )
    );

    this.editStatus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StatusActions.statusEditStatus),
        switchMap((editStatusDto: EditStatusDto) =>
          this.apiService.Statuses.EditStatus(editStatusDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Status edited", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return StatusActions.statusEditStatusSuccess(editStatusDto);
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return StatusActions.statusEditStatusFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(StatusActions.statusEditStatusFailure({ error: error.message }))
            )
          )
        )
      )
    );



  }
}
