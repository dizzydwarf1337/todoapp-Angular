import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Status } from '../../../core/models/status';
import { Observable } from 'rxjs';
import { selectStatuses } from '../../../core/stores/statusStore/status.selectors';

@Component({
  selector: 'app-status-list',
  standalone: false,
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.scss'
})
export class StatusListComponent {

  statuses$: Observable<Status[]>;

  constructor(private store: Store) {
    this.statuses$ = this.store.select(selectStatuses);
  }

}
