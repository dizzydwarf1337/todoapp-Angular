import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CategoryActions } from './category.actions';
import { ApiService } from '../../services/apiService/api.service';
import { Category } from '../../models/category';
import { CreateStatusDto } from '../../Dtos/Statuses/createStatusDto';
import { EditStatusDto } from '../../Dtos/Statuses/editStatusDto';
import { ApiResponse } from '../../models/ApiResponse';
import { Status } from '../../models/status';
import { StatusActions } from '../statusStore/status.actions';
import { CreateCategoryDto } from '../../Dtos/Categories/CreateCategoryDto';
import { EditCategoryDto } from '../../Dtos/Categories/EditCategoryDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CategoryEffects {

  getCategoryById$;
  getCategoriesByUserId$;
  createCategory$;
  deleteCategory$;
  editCategory$;


  constructor(private actions$: Actions, private apiService: ApiService, private snackBar: MatSnackBar,)
  {

    this.getCategoryById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoryActions.categoryGetCategoryById),
        switchMap(({ categoryId }) =>
          this.apiService.Categories.GetCategoryById(categoryId).pipe(
            map((response: ApiResponse<Category>) => {
              if (response.isSuccess) {

                return CategoryActions.categoryGetCategoryByIdSuccess(response.value);
              } else {
                return CategoryActions.categoryGetCategoryByIdFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(CategoryActions.categoryGetCategoryByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );
    this.getCategoriesByUserId$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoryActions.categoryGetCategoryesByUserId),
        switchMap(({ userId }) =>
          this.apiService.Categories.GetUserCategories(userId).pipe(
            map((response: ApiResponse<Category[]>) => {
              if (response.isSuccess) {
                console.log('Loading categories for user' + response.value);
                return CategoryActions.categoryGetCategoryesByUserIdSuccess({ categories: response.value });
              } else {
                return CategoryActions.categoryGetCategoryesByUserIdFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(StatusActions.statusGetStatusesByUserIdFailure({ error: error.message }))
            )
          )
        )
      )
    );
    this.createCategory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoryActions.categoryCreateCategory),
        switchMap((createCategoryDto: CreateCategoryDto) =>
          this.apiService.Categories.CreateCategory(createCategoryDto).pipe(
            map((response: ApiResponse<Category>) => {
              if (response.isSuccess) {
                this.snackBar.open("Category created","", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return CategoryActions.categoryCreatecategorySuccess(response.value);
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return CategoryActions.categoryCreatecategoryFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(CategoryActions.categoryCreatecategoryFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteCategory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoryActions.categoryDeleteCategory),
        switchMap(({ categoryId }) =>
          this.apiService.Categories.DeleteCategory(categoryId).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Category deleted", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return CategoryActions.categoryDeleteCategorySuccess({ categoryId: categoryId });
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return CategoryActions.categoryDeleteCategoryFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(CategoryActions.categoryDeleteCategoryFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.editCategory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoryActions.categoryEditCategory),
        switchMap((editCategoryDto: EditCategoryDto) =>
          this.apiService.Categories.EditCategory(editCategoryDto).pipe(
            map((response: ApiResponse<string>) => {
              if (response.isSuccess) {
                this.snackBar.open("Category edited", "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-success']
                });
                return CategoryActions.categoryEditCategorySuccess(editCategoryDto);
              } else {
                this.snackBar.open(response.error.toString(), "", {
                  duration: 3000,
                  horizontalPosition: 'right',
                  panelClass: ['snackbar-error']
                });
                return CategoryActions.categoryEditCategoryFailure({ error: response.error });
              }
            }),
            catchError((error) =>
              of(CategoryActions.categoryEditCategoryFailure({ error: error.message }))
            )
          )
        )
      )
    );


  }
}
