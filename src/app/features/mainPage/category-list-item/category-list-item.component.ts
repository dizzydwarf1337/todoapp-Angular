import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../core/models/category';
import { Store } from '@ngrx/store';
import { CategoryActions } from '../../../core/stores/categoryStore/category.actions';

@Component({
  selector: 'app-category-list-item',
  standalone: false,
  templateUrl: './category-list-item.component.html',
  styleUrl: './category-list-item.component.scss'
})
export class CategoryListItemComponent implements OnInit {
  @Input() category: Category | undefined;

  title$: string = "";


  constructor(private store: Store) {

  }

  ngOnInit():void {
    if (this.category) {
      this.title$ = this.category.name;
    }
  }


  handleEdit = () => {
    if (this.title$ !== this.category!.name) {

      this.store.dispatch(CategoryActions.categoryEditCategory({ categoryId: this.category!.id, categoryName: this.title$ }))
    }
  }
  handleDelete = () => {
    this.store.dispatch(CategoryActions.categoryDeleteCategory({ categoryId: this.category!.id}))
  }

}
