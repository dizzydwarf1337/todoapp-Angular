import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category';
import { Status } from '../../../core/models/status';
import { Store } from '@ngrx/store';
import { selectStatuses } from '../../../core/stores/statusStore/status.selectors';
import { selectCategories } from '../../../core/stores/categoryStore/category.selectors';
import { CreateTaskDto } from '../../../core/Dtos/Tasks/createTaskDto';
import { selectUser } from '../../../core/stores/userStore/user.selectors';
import { TaskActions } from '../../../core/stores/taskStore/task.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-modal',
  standalone: false,
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent implements OnInit {


  createTaskDto: CreateTaskDto = {
    title: "",
    description: "",
    categoriesId: [],
    statusId: "",
    userId:"",
  }

  constructor(public dialogRef: MatDialogRef<TaskModalComponent>, private store: Store) { }

  statuses: Observable<Status[] | null> | undefined;
  categories: Observable<Category[] | null> | undefined;

  ngOnInit(): void {
    this.statuses = this.store.select(selectStatuses);
    this.categories = this.store.select(selectCategories);
    this.store.select(selectUser).subscribe(user => {
      this.createTaskDto.userId = user!.id;
      console.log(user);
    });
    }
  handleAddTask = () => {
    this.store.dispatch(TaskActions.taskCreateTask(this.createTaskDto))
    this.dialogRef.close();
  };
  handleCloseModal = () => {
    this.dialogRef.close();
  }
}
