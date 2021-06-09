import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Department } from 'src/app/classes/department.model';
import { Employee } from 'src/app/classes/employee.model';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageEmployeeService } from 'src/app/services/manage-employee/manage-employee.service';

@Component({
  selector: 'app-add-teacher-dialog',
  templateUrl: './add-teacher-dialog.component.html',
  styleUrls: ['./add-teacher-dialog.component.scss']
})
export class AddTeacherDialogComponent implements OnInit {
  titleOfPage="Thêm Giáo Viên"
  addTeacherForm=new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthday: new FormControl('',Validators.required),
    sex: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern('^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl('',[Validators.required, Validators.email] ),
    departmentId: new FormControl('',Validators.required),
  })
  picker=true
  ShowSpinner=false;

  Department:Department[]=[]
  constructor(
    private dataDepartmentService:ManageDepartmentService,
    private dataTeacherService:ManageEmployeeService,
    private dialogRef: MatDialogRef<AddTeacherDialogComponent>,) { 
    }

  ngOnInit(): void {
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
  }
  confirm(teacher:Employee){
    if(this.addTeacherForm.invalid){
      this.addTeacherForm.markAllAsTouched()
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'  
    }
    else{
      if(teacher.sex==true){
        teacher.sex=true
      }
      else{
        teacher.sex=false
      }
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      this.dataTeacherService.AddTeacher(teacher).subscribe(
        res=>{
          this.ShowSpinner=false
          this.dialogRef.close(res);
          alert('Thêm Giáo Viên Thành Công')
        },
        err=>{
          alert('Thực Hiện Thất Bại')
          console.log(err.error);
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
