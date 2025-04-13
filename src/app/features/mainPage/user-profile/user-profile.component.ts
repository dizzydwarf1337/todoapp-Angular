import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../core/stores/userStore/user.selectors';
import { Observable } from 'rxjs';
import { AppActions } from '../../../core/stores/appStore/app.actions';
import { Router } from '@angular/router';
import { UserActions } from '../../../core/stores/userStore/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { CategoryStatusModalComponent } from '../category-status-modal/category-status-modal.component';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {


  user$: Observable<User | null> | undefined;


  constructor(private store: Store, private router: Router, public dialog: MatDialog) {
    this.user$ = this.store.select(selectUser);

    this.user$.subscribe(user => {
      console.log('USER:', user);
    });
  }

  handleLogout() {
    this.store.dispatch(AppActions.appClearData());
    this.router.navigate(['/login']);
  }

  handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete user?');

    if (confirmed) {
      this.user$!.subscribe(user => {
        if (user) {
          this.store.dispatch(UserActions.userDelete({ userId: user.id }));
          this.store.dispatch(AppActions.appClearData());
          this.router.navigate(['/login']);
        }
      });
    };
  }

}
