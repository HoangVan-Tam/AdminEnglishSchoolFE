import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageRecruitmentComponent } from './manage-recruitment.component';

const routes: Routes = [{ path: '', component: ManageRecruitmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRecruitmentRoutingModule { }
