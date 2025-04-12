import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { LayoutComponent } from './features/layout/layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponentComponent } from './features/login-component/login-component.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/reducers';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoryEffects } from './core/stores/categoryStore/category.effects';
import * as fromStatus from './core/stores/statusStore/status.reducer';
import { StatusEffects } from './core/stores/statusStore/status.effects';
import * as fromTask from './core/stores/taskStore/task.reducer';
import { TaskEffects } from './core/stores/taskStore/task.effects';
import * as fromUser from './core/stores/userStore/user.reducer';
import { UserEffects } from './core/stores/userStore/user.effects';
import * as fromCategory from './core/stores/categoryStore/category.reducer';
import { ApiService } from './core/services/apiService/api.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppEffects } from './core/stores/appStore/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([AppEffects, CategoryEffects, StatusEffects, TaskEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.CategoryReducer),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.StatusReducer),
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.TaskReducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.UserReducer),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
