import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdminRoutingModule } from './manage-question-routing.module';
import { ManageQuestionComponent } from './manage-question.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';
import { ManageQuestionService } from '../../../services/manage-question/manage-question.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddQuestionDialogComponent,
    ManageQuestionComponent,
    EditQuestionDialogComponent
  ],
  imports: [
    CommonModule,
    ManageAdminRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [httpInterceptorProviders, ManageQuestionService],
})
export class ManageQuestionModule { }
