import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageQuestionComponent } from './manage-question.component';

const routes: Routes = [
  { path: '', component: ManageQuestionComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAdminRoutingModule { }
