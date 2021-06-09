import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCourseComponent } from './manage-course.component';

const routes: Routes = [{ path: '', component: ManageCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCourseRoutingModule { }
