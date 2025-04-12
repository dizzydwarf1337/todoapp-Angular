import { createFeature, createReducer, on } from '@ngrx/store';
import { StatusActions } from './status.actions';
import { Status } from '../../models/status';

export const statusFeatureKey = 'status';

export interface StatusState {
  selectedStatus: Status | null,
  statuses: Status[],
  isLoading: boolean,
  error:string | null,
}

export const initialState: StatusState = {
  selectedStatus: null,
  statuses: [],
  isLoading: false,
  error:null,
};

export const StatusReducer = createReducer(
  initialState,
  on(StatusActions.statusStatus, state => state),

  on(StatusActions.statusCreateStatus, state => ({
    ...state,
    isLoading: true,
  })),
  on(StatusActions.statusDeleteStatus, state => ({
    ...state,
    isLoading: true,
  })),
  on(StatusActions.statusEditStatus, state => ({
    ...state,
    isLoading: true,
  })),
  on(StatusActions.statusGetStatusById, state => ({
    ...state,
    isLoading: true,
  })),
  on(StatusActions.statusGetStatusesByUserId, state => ({
    ...state,
    isLoading: true,
  })),


  on(StatusActions.statusCreateStatusSuccess, (state, status) => ({
    ...state,
    statuses: [...state.statuses, status],
    isLoading:false,
  })),

  on(StatusActions.statusDeleteStatusSuccess, (state, { statusId }) => ({
    ...state,
    statuses: state.statuses.filter(status=>status.id !== statusId),
    isLoading: false,
  })),

  on(StatusActions.statusEditStatusSuccess, (state, statusEditDto) => ({
    ...state,
    statuses: state.statuses.map(status =>
      status.id === statusEditDto.statusId
        ? { ...status, ...statusEditDto } 
        : status 
    ),
    isLoading: false,
  })),


  on(StatusActions.statusGetStatusByIdSuccess, (state, status) => ({
    ...state,
    selectedStatus:status,
    isLoading: false,
  })),

  on(StatusActions.statusGetStatusesByUserIdSuccess, (state, { statuses }) => ({
    ...state,
    statuses:statuses,
    isLoading: false,
  })),

  on(StatusActions.statusCreateStatusFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(StatusActions.statusDeleteStatusFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(StatusActions.statusEditStatusFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(StatusActions.statusGetStatusByIdFailure, state => ({
    ...state,
    isLoading: false,
  })),
  on(StatusActions.statusGetStatusesByUserIdFailure, state => ({
    ...state,
    isLoading: false,
  })),
);


export const statusFeature = createFeature({
  name: statusFeatureKey,
  reducer: StatusReducer,
});

