import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../../core/stores/appStore/app.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryStatusModalComponent } from '../mainPage/category-status-modal/category-status-modal.component';
import { TaskModalComponent } from '../mainPage/task-modal/task-modal.component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {


  constructor(private store: Store, private router: Router, private dialog :MatDialog) { }


  openModal = (type: string) => {
    const dialogRef = this.dialog.open(CategoryStatusModalComponent, {
      data: { type }
    });
  }
  openTaskModal = () => {
    const dialogRef = this.dialog.open(TaskModalComponent, {

    });
  }
}
