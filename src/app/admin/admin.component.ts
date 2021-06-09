import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../classes/employee.model';
import { ManageEmployeeService } from '../services/manage-employee/manage-employee.service';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  firstName!:any
  lastName!:any
  Subscription!:Subscription
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private dataEmployeeService:ManageEmployeeService,
    ) {}
  ngOnInit(): void {
    this.Subscription=this.dataEmployeeService.GetEmployee(localStorage.getItem('userId')).subscribe(
      res=>{
        this.firstName=res.firstName
        this.lastName=res.lastName
        setTimeout(()=>{
          localStorage.clear()
          this.router.navigate(['login'])
        }, 3600000);
      }
    )
    if(this.lastName!=null || this.firstName!=null){
      this.Subscription.unsubscribe();
    }
  }
  ClearToken(){
    localStorage.clear()
  }

  OpenAddEmployeeDialog(){
    let dialogRef= this.dialog.open(AddEmployeeDialogComponent,{
      width:"60vw",
      height:"95vh",
    })
  }
  ChangePasswordialog(){
    let dialogRef= this.dialog.open(ChangePasswordDialogComponent,{
      width:"60vw",
      height:"50vh",
    })
  }
}
