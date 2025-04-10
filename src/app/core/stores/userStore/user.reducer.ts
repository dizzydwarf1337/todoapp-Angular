import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../../models/user';

export const userFeatureKey = 'user';

export interface State {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  isLoading:false
};

export const reducer = createReducer(
  initialState,
  on(UserActions.userLogin, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.userLoginSuccess, (state, user) => ({
    ...state,
    user,
    error: null,
    isLoading: false,
  })),
  on(UserActions.userLoginFailure, (state, { error }) => ({
    ...state,
    user: null,  
    error,
    isLoading:false,
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

