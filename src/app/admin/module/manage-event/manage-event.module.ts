import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEventRoutingModule } from './manage-event-routing.module';
import { ManageEventComponent } from './manage-event.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlePageModule } from '../../component/title-page/title-page.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
import { ManageEventService } from 'src/app/services/manage-event/manage-event.service';
import { httpInterceptorProviders } from 'src/app/services/http-interceptors';


@NgModule({
  declarations: [
    ManageEventComponent,
    AddEventDialogComponent,
    EditEventDialogComponent,
  ],
  imports: [
    CommonModule,
    ManageEventRoutingModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TitlePageModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers:[httpInterceptorProviders, ManageEventService]
})
export class ManageEventModule { }
