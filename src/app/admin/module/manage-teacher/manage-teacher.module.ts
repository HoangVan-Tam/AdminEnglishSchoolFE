import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentRoutingModule } from './manage-teacher-routing.module';
import { ManageTeacherComponent } from './manage-teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTeacherDialogComponent } from './add-teacher-dialog/add-teacher-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { ManageStudentService } from '../../../services/manage-student/manage-student.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageCourseService } from 'src/app/services/manage-course/manage-course.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';
import { EditTeacherDialogComponent } from './edit-teacher-dialog/edit-teacher-dialog.component';
@NgModule({
  declarations: [
    ManageTeacherComponent,
    EditTeacherDialogComponent,
    AddTeacherDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    ManageStudentRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    TitlePageModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers:[httpInterceptorProviders, ManageStudentService, ManageDepartmentService, ManageCourseService]
})
export class ManageTeacherModule { }
