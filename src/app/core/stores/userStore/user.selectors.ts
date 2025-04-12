import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);



export const selectUser = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.isLoggedIn
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.isLoading
);

export const selectError = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.error
);

export const selectToken = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.user!.token,
);
