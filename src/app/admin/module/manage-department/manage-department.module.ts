import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDepartmentRoutingModule } from './manage-department-routing.module';
import { ManageDepartmentComponent } from './manage-department.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { AddDeparmentDialogComponent } from './add-department-dialog/add-department-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDeparmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { ManageDepartmentService } from '../../../services/manage-department/manage-department.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';


@NgModule({
  declarations: [
    ManageDepartmentComponent,
    AddDeparmentDialogComponent,
    EditDeparmentDialogComponent
    ],
  imports: [
    CommonModule,
    ManageDepartmentRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers:[httpInterceptorProviders, ManageDepartmentService]
})
export class ManageDepartmentModule { }
