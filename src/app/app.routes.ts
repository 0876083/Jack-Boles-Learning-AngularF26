import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';
import { recordEditGuard } from './services/record-edit-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'records',
    pathMatch: 'full'
  },
  {
    path: 'records',
    component: RecordList
  },
  {
    path: 'records/add',
    loadComponent: () => import('./record-form/record-form').then(m => m.RecordForm)
  },
  {
    path: 'records/edit/:id',
    loadComponent: () => import('./record-form/record-form').then(m => m.RecordForm),
    canActivate: [recordEditGuard]
  },
  {
    path: 'records/:id',
    loadComponent: () => import('./record-detail/record-detail').then(m => m.RecordDetail)
  }
];
