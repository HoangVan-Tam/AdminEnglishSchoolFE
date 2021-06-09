import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRecruitmentRoutingModule } from './manage-recruitment-routing.module';
import { ManageRecruitmentComponent } from './manage-recruitment.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManageRecruitmentService } from '../../../services/manage-recruitment/manage-recruitment.service';
import { AddRecruitmentDialogComponent } from './add-recruitment-dialog/add-recruitment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditRecruitmentDialogComponent } from './edit-recruitment-dialog/edit-recruitment-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';


@NgModule({
  declarations: [
    EditRecruitmentDialogComponent,
    ConfirmDialogComponent,
    AddRecruitmentDialogComponent,
    ManageRecruitmentComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ManageRecruitmentRoutingModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers:[httpInterceptorProviders, ManageRecruitmentService]
})
export class ManageRecruitmentModule { }
