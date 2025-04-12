import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppActions } from './core/stores/appStore/app.actions';
import { UserActions } from './core/stores/userStore/user.actions';
import { selectUser } from './core/stores/userStore/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {

    const userJson = (localStorage.getItem("todo-user"));
    if (userJson) {
      let user = JSON.parse(userJson);
      this.store.dispatch(UserActions.userSetUser(user));
      this.store.dispatch(AppActions.appLoadAllData({ userId: user.id }));
      this.router.navigate(['/main']);
    }
    else this.router.navigate(['/login']);


  }


  title = 'todoapp-Angular';






}
