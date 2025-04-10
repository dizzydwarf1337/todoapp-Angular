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
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    EffectsModule.forFeature([CategoryEffects, StatusEffects, TaskEffects, UserEffects, UserEffects, CategoryEffects, StatusEffects, TaskEffects]),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.reducer),
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.reducer),
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducer),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
