import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageParentRoutingModule } from './manage-parent-routing.module';
import { ManageParentComponent } from './manage-parent.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ManageStudentService } from '../../../services/manage-student/manage-student.service';
import { AddParentDialogComponent } from '../student-detail/add-parent-dialog/add-parent-dialog.component';
import { AddStudentOfParentDialogComponent } from './add-studentofparent-dialog/add-studentofparent-dialog.component';
import { EditStudentOfStudentDialogComponent } from './edit-parent-dialog/edit-parent-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { ManageParentService } from 'src/app/services/manage-parent/manage-parent.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';



@NgModule({
  declarations: [
    ManageParentComponent,
    AddStudentOfParentDialogComponent,
    EditStudentOfStudentDialogComponent,
  ],
  imports: [
    CommonModule,
    ManageParentRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TitlePageModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers:[httpInterceptorProviders, ManageParentService, ManageStudentService]
})
export class ManageParentModule { }
