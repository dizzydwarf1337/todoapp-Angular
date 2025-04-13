import { Component, Input, OnInit } from '@angular/core';
import { selectTasksWithStatus } from '../../../core/stores/taskStore/task.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/task';
import { Category } from '../../../core/models/category';
import { selectCategories } from '../../../core/stores/categoryStore/category.selectors';
import { Status } from '../../../core/models/status';
import { selectStatuses } from '../../../core/stores/statusStore/status.selectors';


@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  @Input() statusId: string | null = "";
  tasks$: Observable<Task[] | undefined> = new Observable();
  allCategories: Observable<Category[] | null> | undefined;
  allStatuses: Observable<Status[]> | undefined;
  constructor(private store: Store) { }
  ngOnInit() { 
    this.tasks$ = this.store.select(selectTasksWithStatus(this.statusId!));
    this.allCategories = this.store.select(selectCategories);
    this.allStatuses = this.store.select(selectStatuses);
  }
}
