import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskActions } from './task.actions';

export const taskFeatureKey = 'task';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(TaskActions.taskTasks, state => state),

);

export const taskFeature = createFeature({
  name: taskFeatureKey,
  reducer,
});

