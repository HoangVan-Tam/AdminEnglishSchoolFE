import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/classes/department.model';
import { Student } from 'src/app/classes/student.model';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageStudentService } from '../../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {
  students!:Student
  titleOfPage="Cập Nhật Thông Tin Học Viên"
  avatar:any
  editStudentForm=new FormGroup({
    firstName: new FormControl(this.data.student.firstName,Validators.required),
    lastName: new FormControl(this.data.student.lastName,Validators.required),
    birthday: new FormControl(this.data.student.birthday,Validators.required),
    sex: new FormControl(this.data.student.sex,Validators.required),
    address: new FormControl(this.data.student.address,Validators.required),
    phoneNumber: new FormControl(this.data.student.phoneNumber,[Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl(this.data.student.email,[Validators.required, Validators.email]),
    level: new FormControl(this.data.student.level,Validators.required),
    departmentId: new FormControl(this.data.student.departmentId,Validators.required),
  })
  men=false
  women=false
  Department:Department[]=[]
  ShowSpinner=false
  constructor(
    private dataDepartmentService:ManageDepartmentService,
    private dataService:ManageStudentService,
    private dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {student: Student}) {  }

  ngOnInit(): void {
    if(this.data.student.sex==true){
      this.men=true
      this.avatar="./assets/img/man-avatar.png"
    }
    else{
      this.women=true
      this.avatar="./assets/img/woman-avatar.png"
    }
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
  }
  confirm(student:Student){
    if(this.editStudentForm.invalid){
      this.editStudentForm.markAllAsTouched()
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      if(student.birthday!=this.data.student.birthday){
        student.birthday.setUTCDate(student.birthday.getDate());
      }  
      student.studentId=this.data.student.studentId
      this.dataService.UpdateStudent(student).subscribe(
        res=>{
          this.ShowSpinner=false
          this.dialogRef.close(1);
          alert('Cập Nhật Học Viên Thành Công')
        },
        err=>{
          console.log(err.error);
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'  
          alert('Cập Nhật Không Thành Công')  
        }
      )
    } 
  }
  closed(){
    this.dialogRef.close(0);
  }
}
