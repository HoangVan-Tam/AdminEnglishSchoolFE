import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageParentComponent } from './manage-parent.component';

const routes: Routes = [{ path: '', component: ManageParentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageParentRoutingModule { }
