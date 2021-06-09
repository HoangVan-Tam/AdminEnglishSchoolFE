import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './component/menu/menu.component';
import { AdminloginComponent } from './component/admin-login/admin-login.component';
import { AdminService } from '../services/admin/admin.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../services/auth-guard/auth-guard.guard';
import { ManageEmployeeService } from '../services/manage-employee/manage-employee.service';
import { LoginGuard } from '../services/auth-guard/login-guard.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TitlePageModule } from './component/title-page/title-page.module';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    AdminloginComponent,
    AddEmployeeDialogComponent,
    ChangePasswordDialogComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    TitlePageModule,
    ReactiveFormsModule,
  ],
  providers: [LoginGuard ,AuthGuard, ManageEmployeeService, AdminService,],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
