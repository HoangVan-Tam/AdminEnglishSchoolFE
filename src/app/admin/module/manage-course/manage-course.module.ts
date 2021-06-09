import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseRoutingModule } from './manage-course-routing.module';
import { ManageCourseComponent } from './manage-course.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ManageCourseService } from '../../../services/manage-course/manage-course.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';


@NgModule({
  declarations: [
    ManageCourseComponent,
    AddCourseDialogComponent,
    EditCourseDialogComponent,
  ],
  imports: [
    CommonModule,
    ManageCourseRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers:[httpInterceptorProviders, ManageCourseService]
})
export class ManageCourseModule { }
