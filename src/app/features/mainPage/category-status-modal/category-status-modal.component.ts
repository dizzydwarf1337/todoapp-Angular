import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StatusActions } from '../../../core/stores/statusStore/status.actions';
import { selectUser, selectUserState } from '../../../core/stores/userStore/user.selectors';
import { CategoryActions } from '../../../core/stores/categoryStore/category.actions';

@Component({
  selector: 'app-category-status-modal',
  standalone: false,
  templateUrl: './category-status-modal.component.html',
  styleUrl: './category-status-modal.component.scss'
})
export class CategoryStatusModalComponent {


  name: string = '';
  userId: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<CategoryStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string },
    private store:Store,
  ) {
    this.store.select(selectUser).subscribe((user) => {
      this.userId = user?.id;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();  
  }
  handleCreateStatus() {
    if (this.name !== "") {
      this.store.dispatch(StatusActions.statusCreateStatus({ title: this.name!, userId: this.userId! }))
      this.dialogRef.close();
    }
  }
  handleCreateCategory() {
    if (this.name !== "") {
      this.store.dispatch(CategoryActions.categoryCreateCategory({ title: this.name!, userId: this.userId! }))
      this.dialogRef.close();
    }
  }
  handleCreate() {
    if (this.data.type === 'category' && this.name !== "") {
      this.handleCreateCategory();

    } else {
      this.handleCreateStatus();
 
    }
  }

}
