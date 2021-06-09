import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAdvisoryComponent } from './manage-advisory.component';

const routes: Routes = [{ path: '', component: ManageAdvisoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAdvisoryRoutingModule { }
