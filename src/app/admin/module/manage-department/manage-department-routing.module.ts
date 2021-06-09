import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageDepartmentComponent } from './manage-department.component';

const routes: Routes = [{ path: '', component: ManageDepartmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDepartmentRoutingModule { }
