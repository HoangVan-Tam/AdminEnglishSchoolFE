import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseRoutingModule } from './manage-class-routing.module';
import { ManageClassComponent } from './manage-class.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddClassDialogComponent } from './add-class-dialog/add-class-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { EditClassDialogComponent } from './edit-class-dialog/edit-class-dialog.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ManageCourseService } from '../../../services/manage-course/manage-course.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';
import { ManageClassService } from 'src/app/services/manage-class/manage-course.service';


@NgModule({
  declarations: [
    ManageClassComponent,
    AddClassDialogComponent,
    EditClassDialogComponent,
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
  providers:[httpInterceptorProviders, ManageClassService, ManageCourseService]
})
export class ManageClassModule { }
