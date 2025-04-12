import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../../models/category';
import { EditCategoryDto } from '../../Dtos/Categories/EditCategoryDto';
import { CreateCategoryDto } from '../../Dtos/Categories/CreateCategoryDto';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Category Categorys': emptyProps(),
    

    'Category createCategory': props<CreateCategoryDto>(),
    'Category createcategorySuccess': props<Category>(),
    'Category createcategoryFailure': props<{ error: string }>(),


    'Category deleteCategory': props<{ categoryId: string }>(),
    'Category deleteCategorySuccess': props<{ categoryId: string }>(),
    'Category deleteCategoryFailure': props<{ error: string }>(),


    'Category editCategory': props<EditCategoryDto>(),
    'Category editCategorySuccess': props<EditCategoryDto>(),
    'Category editCategoryFailure': props<{ error: string }>(),


    'Category getCategoryById': props<{ categoryId: string }>(),
    'Category getCategoryByIdSuccess': props<Category>(),
    'Category getCategoryByIdFailure': props<{ error: string }>(),

    'category getCategoryesByUserId': props<{ userId: string }>(),
    'category getCategoryesByUserIdSuccess': props<{ categories: Category[] }>(),
    'category getCategoryesByUserIdFailure': props<{ error: string }>(),


    'Category CategoryClear': emptyProps(),
  }
});
