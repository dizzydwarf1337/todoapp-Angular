import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoryActions } from './category.actions';

export const categoryFeatureKey = 'category';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CategoryActions.categoryCategorys, state => state),

);

export const categoryFeature = createFeature({
  name: categoryFeatureKey,
  reducer,
});

