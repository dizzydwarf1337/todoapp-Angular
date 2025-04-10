import { Component } from '@angular/core';
import { ApiService } from '../../core/services/apiService/api.service';
import { Category } from '../../core/models/category';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../core/stores/userStore/user.reducer';
import { UserActions } from '../../core/stores/userStore/user.actions';
import { LoginDto } from '../../core/Dtos/Auth/loginDto';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {


  constructor(private store: Store<State>) {
    this.isLoading$ = store.select(state => state.isLoading);
  }

  loginDto: LoginDto = {
    password: "",
    username:"",
  }

  isLogin: boolean = false;
  isLoading$: Observable<boolean>;

  handleFormChange = () => {
    this.isLogin = !this.isLogin;
  }

  handleLogin() {
    if (this.isLogin) {
      this.store.dispatch(UserActions['userLogin'](this.loginDto));
    }
  }
}
