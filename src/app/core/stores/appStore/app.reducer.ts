import { ActionReducerMap } from "@ngrx/store";
import { categoryFeatureKey, CategoryReducer, CategoryState } from "../categoryStore/category.reducer";
import { taskFeatureKey, TaskReducer, TaskState } from "../taskStore/task.reducer";
import { userFeatureKey, UserReducer, UserState } from "../userStore/user.reducer";


export interface AppState {
  [userFeatureKey]: UserState;
  [taskFeatureKey]: TaskState;
  [categoryFeatureKey]: CategoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  [userFeatureKey]: UserReducer,
  [taskFeatureKey]: TaskReducer,
  [categoryFeatureKey]: CategoryReducer,
};
