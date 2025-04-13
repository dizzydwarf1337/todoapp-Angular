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
import { StatusDashboardComponent } from './features/mainPage/status-dashboard/status-dashboard.component';
import { StatusListComponent } from './features/mainPage/status-list/status-list.component';
import { StatusListItemComponent } from './features/mainPage/status-list-item/status-list-item.component';
import { TaskListComponent } from './features/mainPage/task-list/task-list.component';
import { TaskListItemComponent } from './features/mainPage/task-list-item/task-list-item.component';
import { UserProfileComponent } from './features/mainPage/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { CategoryStatusModalComponent } from './features/mainPage/category-status-modal/category-status-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from './features/mainPage/task-modal/task-modal.component';
import { CategoryDashboardComponent } from './features/mainPage/category-dashboard/category-dashboard.component';
import { CategoryListItemComponent } from './features/mainPage/category-list-item/category-list-item.component';
import { CategoryListComponent } from './features/mainPage/category-list/category-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponentComponent,
    StatusDashboardComponent,
    StatusListComponent,
    StatusListItemComponent,
    TaskListComponent,
    TaskListItemComponent,
    UserProfileComponent,
    CategoryStatusModalComponent,
    TaskModalComponent,
    CategoryDashboardComponent,
    CategoryListItemComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatSelectModule,
    DragDropModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
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
