import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY_FACTORY } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';


@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  titleOfPage="Đổi Mật Khẩu"
  addChangePasswordForm=new FormGroup({
    oldPassword: new FormControl('',Validators.required),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })

  ShowSpinner=false
  constructor(
    private dataAdminService:AdminService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject (MAT_DIALOG_DATA) private data:{id:number}) { 
    }

  ngOnInit(): void {
  }
  confirm(account:any){
    document.getElementsByTagName('p')[3].style.display='none'
    this.ShowSpinner=true
    if(this.addChangePasswordForm.invalid){
      this.addChangePasswordForm.markAllAsTouched()
    }
    else if(this.addChangePasswordForm.get('confirmNewPassword')?.value!=this.addChangePasswordForm.get('newPassword')?.value){
      document.getElementsByTagName('p')[3].style.display='inline'
      alert('Xác Nhận Mật Khấu Không Đúng')
    }
    else{
      account.userName=localStorage.getItem('userId')
      this.dataAdminService.ChangePassword(account).subscribe(
        res=>{
          this.ShowSpinner=false
          document.getElementsByTagName('p')[3].style.display='inline'
          alert("Đổi Mật Khấu Thành Công")
          this.dialogRef.close(res)
        },
        err=>{
          this.ShowSpinner=false
          document.getElementsByTagName('p')[3].style.display='inline'
          if(err.error.Message=='Old Password is not correct'){
            alert("Mật Khẩu Cũ Không Chính Xác")
          }
          else{
            alert("Đổi Mật Khẩu Thất Bại")
          }
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
