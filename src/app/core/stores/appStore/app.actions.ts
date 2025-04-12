import { createAction, createActionGroup, props } from "@ngrx/store";





export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'App loadAllData': props<{ userId: string }>(),
    'App loadAllData Success': props < {message:string}>(),
    'App loadAllData Failure': props < {error:string}>(),
  }
})


