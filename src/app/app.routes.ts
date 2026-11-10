import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';
import { RecordDetail } from './record-detail/record-detail';
import { RecordForm } from './record-form/record-form';
import { recordEditGuard } from './services/record-edit-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'records', pathMatch: 'full' },
  { path: 'records', component: RecordList },
  { path: 'records/add', component: RecordForm },
  { path: 'records/edit/:id', component: RecordForm, canActivate: [recordEditGuard] },
  { path: 'records/:id', component: RecordDetail },
];
