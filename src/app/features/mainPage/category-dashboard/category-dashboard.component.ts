import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category';
import { CategoryActions } from '../../../core/stores/categoryStore/category.actions';
import { UserActions } from '../../../core/stores/userStore/user.actions';
import { selectUser } from '../../../core/stores/userStore/user.selectors';
import { selectCategories } from '../../../core/stores/categoryStore/category.selectors';

@Component({
  selector: 'app-category-dashboard',
  standalone: false,
  templateUrl: './category-dashboard.component.html',
  styleUrl: './category-dashboard.component.scss'
})
export class CategoryDashboardComponent {




}
