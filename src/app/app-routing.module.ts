import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './features/login-component/login-component.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './features/layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },

  {
    path: 'main',
    component: LayoutComponent,
    children: [
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
