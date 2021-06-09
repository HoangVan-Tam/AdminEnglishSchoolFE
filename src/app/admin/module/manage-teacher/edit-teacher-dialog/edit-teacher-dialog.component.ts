import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/classes/department.model';
import { Employee } from 'src/app/classes/employee.model';
import { Student } from 'src/app/classes/student.model';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageEmployeeService } from 'src/app/services/manage-employee/manage-employee.service';
import { ManageStudentService } from '../../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-edit-teacher-dialog',
  templateUrl: './edit-teacher-dialog.component.html',
  styleUrls: ['./edit-teacher-dialog.component.scss']
})
export class EditTeacherDialogComponent implements OnInit {
  students!:Student
  titleOfPage="Cập Nhật Thông Tin Giáo Viên"
  avatar:any
  editTeacherForm=new FormGroup({
    firstName: new FormControl(this.data.teacher.firstName,Validators.required),
    lastName: new FormControl(this.data.teacher.lastName,Validators.required),
    birthday: new FormControl(this.data.teacher.birthday,Validators.required),
    sex: new FormControl(this.data.teacher.sex,Validators.required),
    address: new FormControl(this.data.teacher.address,Validators.required),
    phoneNumber: new FormControl(this.data.teacher.phoneNumber,[Validators.required, Validators.pattern('^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl(this.data.teacher.email,[Validators.required, Validators.email]),
    level: new FormControl(this.data.teacher.status,Validators.required),
    departmentId: new FormControl(this.data.teacher.departmentId,Validators.required),
  })
  men=false
  women=false
  Department:Department[]=[]
  ShowSpinner=false
  constructor(
    private dataDepartmentService:ManageDepartmentService,
    private dataTeacherService:ManageEmployeeService,
    private dialogRef: MatDialogRef<EditTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {teacher: Employee}) {  }

  ngOnInit(): void {
    if(this.data.teacher.sex==true){
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
  confirm(teacher:Employee){
    if(teacher.birthday!=this.data.teacher.birthday){
      teacher.birthday.setUTCDate(teacher.birthday.getDate());
    }  
    teacher.userId=this.data.teacher.userId
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
    this.ShowSpinner=true
    this.dataTeacherService.UpdateTeacher(teacher).subscribe(
      res=>{
        this.ShowSpinner=false
        this.dialogRef.close(res);
        alert('Cập Nhật Thông Tin Giáo Viên Thành Công')
      },
      err=>{
        console.log(err.error);
        this.ShowSpinner=false
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'  
        alert('Cập Nhật Không Thành Công')  
      }
    )
  }
  closed(){
    this.dialogRef.close();
  }
}
