import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { StudentDetailComponent } from './student-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AddRegisterCourseDialogComponent } from './add-registercourse-dialog/add-registercourse-dialog.component'
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditScoreDialogComponent } from './edit-score-dialog/edit-score-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailService } from '../../../services/student-detail/student-detail.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ManageCourseService } from '../../../services/manage-course/manage-course.service';
import { ManageStudentService } from '../../../services/manage-student/manage-student.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';

@NgModule({
  declarations: [
    StudentDetailComponent, 
    AddRegisterCourseDialogComponent,
    EditScoreDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    StudentDetailRoutingModule,
    TitlePageModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[httpInterceptorProviders, StudentDetailService, ManageCourseService, ManageStudentService],
  //exports:[AddParentDialogComponent]
})
export class ManageStudentModule { }
