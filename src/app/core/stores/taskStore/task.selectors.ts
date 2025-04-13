import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.TaskState>(
  fromTask.taskFeatureKey
);


export const selectTasks = createSelector(
  selectTaskState,
  (state: fromTask.TaskState) => state.tasks
);

export const selectSelectedTask = createSelector(
  selectTaskState,
  (state: fromTask.TaskState) => state.selectedTask
);

export const selectIsLoading = createSelector(
  selectTaskState,
  (state: fromTask.TaskState) => state.isLoading
);

export const selectError = createSelector(
  selectTaskState,
  (state: fromTask.TaskState) => state.error
);

export const selectTasksWithStatus = (statusId: string) => createSelector(
  selectTaskState,
  (state: fromTask.TaskState) => state.tasks?.filter(x => x.statusId == statusId),
);
