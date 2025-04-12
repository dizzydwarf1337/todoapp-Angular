import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../../models/user';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
}

export const initialState: UserState = {
  user: null,
  isLoggedIn:false,
  error: null,
  isLoading:false
};

export const UserReducer = createReducer(
  initialState,

  on(UserActions.userSetUser, (state, user) => ({
    ...state,
    user: user,
  })),

  on(UserActions.userLogin, UserActions.userDelete, UserActions.userRegister, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.userLoginSuccess, (state, user) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null,
    isLoading: false,
  })),
  on(UserActions.userLoginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error:error,
    isLoading: false,
  })),
  on(UserActions.userRegisterSuccess, UserActions.userRegisterFailure, UserActions.userDeleteFailure, state => ({
    ...state,
    isLoading:false,
  })),

  on(UserActions.userLogout, state => ({
    user: null,
    isLoggedIn: false,
    error: null,
    isLoading:false,
  }))

);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: UserReducer,
});

