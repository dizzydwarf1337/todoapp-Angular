import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category';
import { selectCategories } from '../../../core/stores/categoryStore/category.selectors';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {


  constructor(private store: Store) {
    this.categories = this.store.select(selectCategories);

  }
  categories: Observable<Category[]>;


}
