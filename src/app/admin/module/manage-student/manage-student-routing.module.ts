import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageStudentComponent } from './manage-student.component';

const routes: Routes = [
  { path: '', component: ManageStudentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStudentRoutingModule { }
