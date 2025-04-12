import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models/task';
import { CreateTaskDto } from '../../Dtos/Tasks/createTaskDto';
import { EditTaskDto } from '../../Dtos/Tasks/editTaskDto';
import { EditTaskStatusDto } from '../../Dtos/Tasks/editTaskStatusDto';
import { EditTaskCategoriesDto } from '../../Dtos/Tasks/editTaskCategoriesDto';
import { Category } from '../../models/category';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Task Tasks': emptyProps(),

    'Task GetTaskById': props<{ taskId:string }>(),
    'Task GetTaskById Success': props<Task>(),
    'Task GetTaskById Failure': props<{error:string}>(),

    'Task GetTasksByUserId': props<{ userId: string }>(),
    'Task GetTasksByUserId Success': props<{tasks:Task[]}>(),
    'Task GetTasksByUserId Failure': props<{ error: string }>(),


    'Task CreateTask': props<CreateTaskDto>(),
    'Task CreateTask Success': props<Task>(),
    'Task CreateTask Failure': props<{ error: string }>(),


    'Task DeleteTask': props<{ taskId: string }>(),
    'Task DeleteTask Success': props<{ taskId: string }>(),
    'Task DeleteTask Failure': props<{ error: string }>(),


    'Task EditTask': props<EditTaskDto>(),
    'Task EditTask Success': props<EditTaskDto>(),
    'Task EditTask Failure': props<{ error: string }>(),


    'Task EditStatus': props<EditTaskStatusDto>(),
    'Task EditStatus Success': props<EditTaskStatusDto>(),
    'Task EditStatus Failure': props<{ error: string }>(),


    'Task EditCategories': props<EditTaskCategoriesDto>(),
    'Task EditCategories Success': props<EditTaskCategoriesDto>(),
    'Task EditCategories Failure': props<{error:string}>(),


    'Task TaskClear': emptyProps(),

  }
});
