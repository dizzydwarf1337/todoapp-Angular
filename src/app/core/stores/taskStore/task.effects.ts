import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TaskActions } from './task.actions';
import { ApiService } from '../../services/apiService/api.service';
import { ApiResponse } from '../../models/ApiResponse';
import { Task } from '../../models/task';
import { EditTaskDto } from '../../Dtos/Tasks/editTaskDto';
import { EditTaskStatusDto } from '../../Dtos/Tasks/editTaskStatusDto';
import { EditTaskCategoriesDto } from '../../Dtos/Tasks/editTaskCategoriesDto';
import { CreateTaskDto } from '../../Dtos/Tasks/createTaskDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskEffects {

  getTaskById$;
  getTasksByUserId$;
  deleteTask$;
  editTask$;
  editTaskStasus$;
  editTaskCategories$;
  createTask$;

  constructor(private actions$: Actions, private apiService: ApiService, private snackBar: MatSnackBar) {


    this.createTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskCreateTask),
        switchMap((createTaskDto: CreateTaskDto) =>
          this.apiService.Tasks.CreateTask(createTaskDto).pipe(
            map((response: ApiResponse<Task>) => {
              if (response.isSuccess) {
                this.snackBar.open("Task created", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return TaskActions.taskCreateTaskSuccess( response.value );
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return TaskActions.taskCreateTaskFailure({ error: response.error });
              }
            }),
            catchError((error) => {
              console.log(error);
              return of(TaskActions.taskCreateTaskFailure({ error: error }))
            }
            )
          )
        )
      )
    );
    

    this.getTaskById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskGetTaskById),
        switchMap(({ taskId }) =>
          this.apiService.Tasks.GetTaskById(taskId).pipe(
            map((response: ApiResponse<Task>) => {
              if (response.isSuccess) {
                return TaskActions.taskGetTaskByIdSuccess(response.value);
              } else {
                return TaskActions.taskGetTaskByIdFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(TaskActions.taskGetTaskByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.getTasksByUserId$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskGetTasksByUserId),
        switchMap(({ userId }) =>
          this.apiService.Tasks.GetTasksByUserId(userId).pipe(
            map((response: ApiResponse<Task[]>) => {
              if (response.isSuccess) {
                return TaskActions.taskGetTasksByUserIdSuccess({ tasks: response.value });
              }
              else {
                return TaskActions.taskGetTasksByUserIdFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(TaskActions.taskGetTasksByUserIdFailure({ error: error }))
            )
          )
        )
      ));

    this.deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskDeleteTask),
        switchMap(({ taskId }) =>
          this.apiService.Tasks.DeleteTask(taskId).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Task deleted", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return TaskActions.taskDeleteTaskSuccess({ taskId: taskId})
              }
              else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return TaskActions.taskDeleteTaskFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(TaskActions.taskDeleteTaskFailure({ error: error }))
            )
          )
        )
      )
    );

    this.editTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskEditTask),
        switchMap((editTaskDto: EditTaskDto) =>
          this.apiService.Tasks.EditTask(editTaskDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Task edited", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return TaskActions.taskEditTaskSuccess(editTaskDto);
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return TaskActions.taskEditTaskFailure({ error: response.error });
              }
            }),
            catchError(error =>
              of(TaskActions.taskEditTaskFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.editTaskStasus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskEditStatus),
        switchMap((editTaskStatusDto: EditTaskStatusDto) => 
          this.apiService.Tasks.EditStatus(editTaskStatusDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Task status edited", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return TaskActions.taskEditStatusSuccess(editTaskStatusDto);
              }
              else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return TaskActions.taskEditStatusFailure({ error: response.error });
              }
            }),
            catchError(error =>
              of(TaskActions.taskEditStatusFailure({ error: error }))
            )
          )
        )
      )
    )

    this.editTaskCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.taskEditCategories),
        switchMap((editTaskCategoriesDto: EditTaskCategoriesDto) =>
          this.apiService.Tasks.EditCategories(editTaskCategoriesDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Task categories edited", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return TaskActions.taskEditCategoriesSuccess(editTaskCategoriesDto);
              }
              else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return TaskActions.taskEditCategoriesFailure({ error: response.error });
              }

            }),
            catchError(error =>
              of(TaskActions.taskEditCategoriesFailure({ error: error }))
            )
          )
        )
      )
    );

  }


}
