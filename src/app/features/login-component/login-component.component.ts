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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  passwordConfirm: string = "";
  error: string = "";

  handleFormChange = () => {
    this.isLogin = !this.isLogin;
  }

  handleLogin = () => {
    this.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.store.dispatch(UserActions.userLogin(this.loginDto));
        this.loginDto.password = "";
        this.loginDto.username = "";
      }
    });
  }

  handleRegister() {
    if (this.validateForm()) {
      this.store.dispatch(UserActions.userRegister({ username: this.loginDto.username, password: this.loginDto.password }))
      this.isLogin = true;
    }
    else {
      this.error = "Passwords dont match";
    }
  }


  validateForm = () => {
    if (this.loginDto.username !== "" && this.loginDto.password !== "" && (this.loginDto.password === this.passwordConfirm)) {
      return true;
    }
    else return false;
  }
}

