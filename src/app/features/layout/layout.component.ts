import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../../core/stores/appStore/app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {


  constructor(private store: Store, private router:Router) { }

  handleLogout() {
    this.store.dispatch(AppActions.appClearData());
    this.router.navigate(['/login']);
  }

}
