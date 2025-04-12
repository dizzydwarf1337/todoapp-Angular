import { Component, computed, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/apiService/api.service';
import { Category } from '../../core/models/category';
import { combineLatest, filter, firstValueFrom, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '../../core/stores/userStore/user.actions';
import { LoginDto } from '../../core/Dtos/Auth/loginDto';
import { UserState } from '../../core/stores/userStore/user.reducer';
import { selectIsLoggedIn } from '../../core/stores/userStore/user.selectors';
import { selectCategories } from '../../core/stores/categoryStore/category.selectors';
import { selectStatuses } from '../../core/stores/statusStore/status.selectors';
import { selectTasks } from '../../core/stores/taskStore/task.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent implements OnInit {


  constructor(private store: Store<UserState>, private router:Router) {
    this.isLoading$ = store.select(state => state.isLoading);
    this.isLoggedIn = store.select(selectIsLoggedIn);
  }

  ngOnInit(): void {
    this.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/main']);  
      }
    });
  }

  loginDto: LoginDto = {
    password: "",
    username:"",
  }
  isLogin: boolean = false;
  isLoggedIn: Observable<boolean>;
  isLoading$: Observable<boolean>;

  handleFormChange = () => {
    this.isLogin = !this.isLogin;
  }



  handleLogin() {
    this.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.store.dispatch(UserActions.userLogin(this.loginDto));
      }
    });

}
}
