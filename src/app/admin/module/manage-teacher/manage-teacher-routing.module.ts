import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTeacherComponent } from './manage-teacher.component';

const routes: Routes = [
  { path: '', component: ManageTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStudentRoutingModule { }
