import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusActions } from './status.actions';

export const statusFeatureKey = 'status';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StatusActions.statusStatuss, state => state),

);

export const statusFeature = createFeature({
  name: statusFeatureKey,
  reducer,
});

