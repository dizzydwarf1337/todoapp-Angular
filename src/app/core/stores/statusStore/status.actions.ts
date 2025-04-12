import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateStatusDto } from '../../Dtos/Statuses/createStatusDto';
import { EditStatusDto } from '../../Dtos/Statuses/editStatusDto';
import { Status } from '../../models/status';

export const StatusActions = createActionGroup({
  source: 'Status',
  events: {
    'Status Status': emptyProps(),


    'Status createStatus': props<CreateStatusDto>(),
    'Status createStatusSuccess': props<Status>(),
    'Status createStatusFailure': props<{ error: string }>(),


    'Status deleteStatus': props<{ statusId: string }>(),
    'Status deleteStatusSuccess': props<{ statusId: string }>(),
    'Status deleteStatusFailure': props<{ error: string }>(),


    'Status editStatus': props<EditStatusDto>(),
    'Status editStatusSuccess': props<EditStatusDto>(),
    'Status editStatusFailure': props<{ error: string }>(),


    'Status getStatusById': props<{ statusId: string }>(),
    'Status getStatusByIdSuccess': props<Status>(),
    'Status getStatusByIdFailure': props<{ error: string }>(),

    'Status getStatusesByUserId': props<{userId:string}>(),
    'Status getStatusesByUserIdSuccess': props<{statuses:Status[]}>(),
    'Status getStatusesByUserIdFailure': props<{error:string}>(),


    'Status StatusClear': emptyProps(),

  }
});
