import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStatus from './status.reducer';

export const selectStatusState = createFeatureSelector<fromStatus.StatusState>(
  fromStatus.statusFeatureKey
);

export const selectStatuses = createSelector(
  selectStatusState,
  (state: fromStatus.StatusState) => state.statuses
);

export const selectSelectedStatus = createSelector(
  selectStatusState,
  (state: fromStatus.StatusState) => state.selectedStatus
);

export const selectIsLoading = createSelector(
  selectStatusState,
  (state: fromStatus.StatusState) => state.isLoading
);
export const selectError = createSelector(
  selectStatusState,
  (state: fromStatus.StatusState) => state.error
);
