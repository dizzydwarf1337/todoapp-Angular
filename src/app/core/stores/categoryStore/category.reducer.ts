import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoryActions } from './category.actions';
import { Category } from '../../models/category';

export const categoryFeatureKey = 'category';





export interface CategoryState {

  selectedCategory:Category|null,
  categories: Category[],
  error: string | null,
  isLoading:boolean,

}

export const initialState: CategoryState = {
  selectedCategory: null,
  categories: [],
  error: null,
  isLoading:false,
};

export const CategoryReducer = createReducer(
  initialState,
  on(CategoryActions.categoryCategorys, state => state),

  on(CategoryActions.categoryCreateCategory, state => ({
    ...state,
    isLoading: true,
  })),
  on(CategoryActions.categoryDeleteCategory, state => ({
    ...state,
    isLoading: true,
  })),
  on(CategoryActions.categoryEditCategory, state => ({
    ...state,
    isLoading: true,
  })),
  on(CategoryActions.categoryGetCategoryById, state => ({
    ...state,
    isLoading: true,
  })),
  on(CategoryActions.categoryGetCategoryesByUserId, state => ({
    ...state,
    isLoading: true,
  })),




  on(CategoryActions.categoryCreatecategorySuccess, (state, category) => ({
    ...state,
    categories: [...state.categories, category],
    isLoading: false,
  })),

  on(CategoryActions.categoryDeleteCategorySuccess, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter(category => category.id !== categoryId),
    isLoading: false,
  })),

  on(CategoryActions.categoryEditCategorySuccess, (state, categoryEditDto) => ({
    ...state,
    categories: state.categories.map(category =>
      category.id === categoryEditDto.categoryId
        ? { ...category, ...categoryEditDto }
        : category
    ),
    isLoading: false,
  })),


  on(CategoryActions.categoryGetCategoryByIdSuccess, (state, category) => ({
    ...state,
    selectedCategory: category,
    isLoading: false,
  })),

  on(CategoryActions.categoryGetCategoryesByUserIdSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    isLoading: false,
  })),


  on(CategoryActions.categoryCreatecategoryFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(CategoryActions.categoryDeleteCategoryFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(CategoryActions.categoryEditCategoryFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(CategoryActions.categoryGetCategoryByIdFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(CategoryActions.categoryGetCategoryesByUserIdFailure, state => ({
    ...state,
    isLoading: false,
  })),

);

export const categoryFeature = createFeature({
  name: categoryFeatureKey,
  reducer: CategoryReducer,
});

