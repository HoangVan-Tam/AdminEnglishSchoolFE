import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/classes/department.model';
import { Parent } from 'src/app/classes/parent.model';
import { Student } from 'src/app/classes/student.model';
import { ManageParentService } from 'src/app/services/manage-parent/manage-parent.service';

@Component({
  selector: 'app-edit-parent-dialog',
  templateUrl: './edit-parent-dialog.component.html',
  styleUrls: ['./edit-parent-dialog.component.scss']
})
export class EditStudentOfStudentDialogComponent implements OnInit {
  students!:Student
  titleOfPage="Cập Nhật Thông Tin Phụ Huynh"
  avatar:any
  editStudentOfStudentForm=new FormGroup({
    firstName: new FormControl(this.data.parent.firstName,Validators.required),
    lastName: new FormControl(this.data.parent.lastName,Validators.required),
    birthday: new FormControl(this.data.parent.birthday,Validators.required),
    sex: new FormControl(this.data.parent.sex,Validators.required),
    phoneNumber: new FormControl(this.data.parent.phoneNumber, [Validators.required, Validators.pattern('^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl(this.data.parent.email,[Validators.required, Validators.email]),
  })
  men=false
  women=false
  Department:Department[]=[]
  ShowSpinner=false
  constructor(
    private dataParentService:ManageParentService,
    private dialogRef: MatDialogRef<EditStudentOfStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {parent: Parent}) {  }

  ngOnInit(): void {
    if(this.data.parent.sex==true){
      this.men=true
      this.avatar="./assets/img/man-avatar.png"
    }
    else{
      this.women=true
      this.avatar="./assets/img/woman-avatar.png"
    }
  }
  confirm(parent:Parent){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
    this.ShowSpinner=true
    if(parent.birthday!=this.data.parent.birthday){
      parent.birthday.setUTCDate(parent.birthday.getDate());
    }  
    parent.parentId=this.data.parent.parentId
    console.log(parent);
    
    this.dataParentService.UpdateParent(parent).subscribe(
      res=>{
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
        this.ShowSpinner=false
        alert('Cập Nhật Thông Tin Phụ Huynh Thành Công')
        this.dialogRef.close(res)
      },
      err=>{
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
        this.ShowSpinner=false
        alert('Cập Nhật Thất Bại')
        console.log(err);
        
      }
    )
  }
  closed(){
    this.dialogRef.close();
  }
}
