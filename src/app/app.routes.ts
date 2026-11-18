import { Routes } from '@angular/router';
import { RecordList } from './record-list/record-list';

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
    path: 'records',
    loadChildren: () => import('./record.routes')
  },
  {
    path: 'records/:id',
    loadComponent: () => import('./record-detail/record-detail').then(m => m.RecordDetail)
  }
];

