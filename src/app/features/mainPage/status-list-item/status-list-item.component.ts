import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../../core/models/status';
import { Store } from '@ngrx/store';
import { StatusActions } from '../../../core/stores/statusStore/status.actions';

@Component({
  selector: 'app-status-list-item',
  standalone: false,
  templateUrl: './status-list-item.component.html',
  styleUrl: './status-list-item.component.scss'
})
export class StatusListItemComponent implements OnInit{

  constructor(private store: Store) { }
  ngOnInit(): void {
    if (this.status) {
      this.title$ = this.status.title;
    }
  }


  @Input() status: Status | undefined;
  title$: string = "";

  handleDelete = () => {
    this.store.dispatch(StatusActions.statusDeleteStatus({ statusId: this.status!.id }));
  }
  handleEdit = () => {
    if (this.title$ !== this.status!.title) {
      this.store.dispatch(StatusActions.statusEditStatus({ statusId: this.status!.id, title: this.title$ }));
    }
  }


}
