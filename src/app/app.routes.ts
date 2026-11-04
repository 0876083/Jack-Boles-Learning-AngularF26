import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';
import { RecordDetail } from './record-detail/record-detail';
import { RecordForm } from './record-form/record-form';

export const routes: Routes = [
  {
    path: 'records',
    component: RecordList,
  },
  { path: 'records/add',
    component: RecordForm
  },
  {
    path: 'records/edit/:id',
    component: RecordForm
  },
  {
    path: 'records/:id',
    component: RecordDetail
  },
];
