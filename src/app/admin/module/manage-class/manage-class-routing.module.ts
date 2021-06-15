import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageClassComponent } from './manage-class.component';

const routes: Routes = [{ path: '', component: ManageClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCourseRoutingModule { }
