import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../core/models/task';
import { forkJoin, map, Observable } from 'rxjs';
import { Category } from '../../../core/models/category';
import { select, Store } from '@ngrx/store';
import { selectCategoriesById } from '../../../core/stores/categoryStore/category.selectors';
import { TaskActions } from '../../../core/stores/taskStore/task.actions';
import { MatSelect } from '@angular/material/select';
import { Status } from '../../../core/models/status';

@Component({
  selector: 'app-task-list-item',
  standalone: false,
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent implements OnInit {

  @Input() task: Task | undefined;
  @ViewChild('select') select!: MatSelect;
  @Input() allCategories: Observable<Category[] | null> | undefined;
  @Input() allStatuses: Observable<Status[]> | undefined;
  description: string = "";
  name: string = "";
  statusId: string = "";
  
  categories$: Observable<Category[]> | undefined;
  selectedCategoryIds: string[] = [];
  constructor(private store: Store) { }

  ngOnInit(): void {
    if (this.task) {
      this.categories$ = this.store.select(selectCategoriesById(this.task!.categoriesId));
      this.description = this.task.taskDescription;
      this.name = this.task.taskName;
      this.statusId = this.task.statusId;
    }
  }

  handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = this.task!.categoriesId.filter(id => id !== categoryId);
    this.store.dispatch(TaskActions.taskEditCategories({
      taskId: this.task!.taskId,
      categoriesId: updatedCategories
    }));
  }



  handleAddCategories() {
    const newCategories = this.selectedCategoryIds.filter(
      id => !this.task!.categoriesId.includes(id)
    );

    if (newCategories.length > 0) {
      this.store.dispatch(TaskActions.taskEditCategories({
        taskId: this.task!.taskId,
        categoriesId: [...this.task!.categoriesId, ...newCategories]
      }));
    }

    this.selectedCategoryIds = [];
  }
  triggerSelect() {
    this.select.open();
  }

  handleDeleteTask = () => {
    this.store.dispatch(TaskActions.taskDeleteTask({ taskId: this.task!.taskId }));
  }
  handleTaskEdit() {
    if (this.description !== this.task!.taskDescription || this.name !== this.task!.taskName) {
      this.store.dispatch(TaskActions.taskEditTask({
        taskId: this.task!.taskId,
        title: this.name,
        description: this.description,
        categoriesId: this.task!.categoriesId,
        statusId: this.task!.statusId,
      }));
    }
  }

  handleTaskStatusEdit = () => {
    if (this.statusId !== this.task!.statusId) {
      this.store.dispatch(TaskActions.taskEditStatus({ taskId: this.task!.taskId, statusId: this.statusId }))
    }
  }

}
