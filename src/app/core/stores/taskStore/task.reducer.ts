import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskActions } from './task.actions';
import { Task } from '../../models/task';

export const taskFeatureKey = 'task';

export interface TaskState {
  selectedTask: Task | null,
  tasks: Task[] | null,
  error: string | null,
  isLoading: boolean,


}

export const initialState: TaskState = {
  selectedTask: null,
  tasks: [],
  error: null,
  isLoading:false,
};

export const TaskReducer = createReducer(
  initialState,
  on(TaskActions.taskTasks, state => state),
  on(TaskActions.taskCreateTask, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditCategories, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskDeleteTask, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditStatus, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskGetTaskById, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskGetTasksByUserId, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditTask, state => ({
    ...state,
    isLoading: true,
  })),



  on(TaskActions.taskCreateTaskSuccess, (state, task ) => ({
    ...state,
    tasks: [...(state.tasks || []), task],
    isLoading: false,
    error: null,
  })),

  on(TaskActions.taskDeleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks?.filter(task => task.taskId !== taskId) || []
  })),

  on(TaskActions.taskEditCategoriesSuccess, (state, { taskId, categoriesId }) => ({
    ...state,
    tasks: state.tasks?.map(task =>
      task.taskId === taskId
        ? { ...task, categoriesId } 
        : task 
    ) || [],
    isLoading:false,
  })),

  on(TaskActions.taskEditStatusSuccess, (state, { taskId, statusId }) => ({
    ...state,
    tasks: state.tasks?.map(task =>
      task.taskId === taskId
        ? { ...task, statusId } 
        : task 
    ) || []
  })),

  on(TaskActions.taskEditTaskSuccess, (state, { taskId, ...editTaskDto }) => ({
    ...state,
    tasks: state.tasks?.map(task =>
      task.taskId === taskId
        ? { ...task, ...editTaskDto }
        : task 
    ) || [],
    isLoading:false,
  })),
  on(TaskActions.taskGetTaskByIdSuccess, (state, task ) => ({
    ...state,
    selectedTask: task,
    isLoading:false,
  })),

  on(TaskActions.taskGetTasksByUserIdSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    isLoading:false,
  })),

  on(TaskActions.taskCreateTaskFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditCategoriesFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskDeleteTaskFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditStatusFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskGetTaskByIdFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskGetTasksByUserIdFailure, state => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.taskEditTaskFailure, state => ({
    ...state,
    isLoading: true,
  })),



  )

export const taskFeature = createFeature({
  name: taskFeatureKey,
  reducer:TaskReducer,
});

