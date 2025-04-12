import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginDto } from '../../Dtos/Auth/loginDto';
import { User } from '../../models/user';
import { RegisterDto } from '../../Dtos/Auth/registerDto';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Users': emptyProps(),
    'User setUser':props<User>(),
    'User login': props<LoginDto>(),
    'User login Success': props<User>(),
    'User login Failure': props<{ error: string }>(),
    'User register': props<RegisterDto>(),
    'User register Success': props<{ message: string }>(),
    'User register Failure': props<{ error: string }>(),
    'User delete': props<{ userId: string }>(),
    'User delete Success': props<{ message: string }>(),
    'User delete Failure': props<{ error: string }>(),
    'User logout': props < {message:string}>(),
  }
});
