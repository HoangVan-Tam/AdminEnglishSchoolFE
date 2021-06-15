import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdvisoryComponent } from './manage-advisory.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';
import { ManageAdvisoryRoutingModule } from './manage-advisory-routing.module';
import { ManageAdvisoryService } from 'src/app/services/manage-advisory/manage-advisory.service';
import { SignalService } from 'src/app/services/signalR/signal.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';


@NgModule({
  declarations: [
    ContactDialogComponent,
    ManageAdvisoryComponent,
  ],
  imports: [
    CommonModule,
    ManageAdvisoryRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers:[httpInterceptorProviders, ManageAdvisoryService, SignalService]
})
export class ManageAdvisoryModule { }
