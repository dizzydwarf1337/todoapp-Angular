import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.CategoryState>(
  fromCategory.categoryFeatureKey
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state: fromCategory.CategoryState) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectCategoryState,
  (state: fromCategory.CategoryState) => state.selectedCategory
);


export const selectIsLoading = createSelector(
  selectCategoryState,
  (state: fromCategory.CategoryState) => state.isLoading
);


export const selectError = createSelector(
  selectCategoryState,
  (state: fromCategory.CategoryState) => state.error
);

export const selectCategoriesById = (categoryIds: string[]) => createSelector(
  selectCategoryState,
  (state: fromCategory.CategoryState) =>
    state.categories.filter(category => categoryIds.includes(category.id))
);
