import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';
import { RecordDetail } from './record-detail/record-detail';

export const routes: Routes = [
  {
    path: 'records',
    component: RecordList,
  },
  {
    path: 'records/:id',
    component: RecordDetail
  },
];
