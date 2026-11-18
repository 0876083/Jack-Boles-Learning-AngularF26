import { Routes } from '@angular/router';
import { RecordForm } from './record-form/record-form';
import { recordEditGuard } from './services/record-edit-guard';

const routes: Routes = [
  {
    path: 'add',
    component: RecordForm
  },
  {
    path: 'edit/:id',
    component: RecordForm,
    canActivate: [recordEditGuard]
  }
];

export default routes
