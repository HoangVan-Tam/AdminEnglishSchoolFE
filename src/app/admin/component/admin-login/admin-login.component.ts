import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminloginComponent implements OnInit {
  ShowSpinner=false
  SubscriptionLogin!:Subscription
  loginForm=new FormGroup({
    userId: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })
  constructor(
    private dialog:MatDialog,
    private dataService:AdminService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.dialog.closeAll()
    localStorage.clear()
  }

  login(account:any){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[0].style.display='none'
      this.ShowSpinner=true
        this.SubscriptionLogin=this.dataService.AdminLogin(account).subscribe(
        res=>{
          localStorage.setItem('token', res.token)
          localStorage.setItem('userId',res.userId)
          document.getElementsByTagName('p')[0].style.display='inline'
          this.ShowSpinner=false
          this.router.navigate(['admin'])
        },
        err=>{
          this.ShowSpinner=false
          console.log(err);
          document.getElementsByTagName('p')[0].style.display='inline'
          alert('Tên Tài Khoản Mật Khẩu Không Chính Xác')
        }
      )
    }
  }
}