import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Department } from 'src/app/classes/department.model';
import { ManageCourseService } from 'src/app/services/manage-course/manage-course.service';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageStudentService } from '../../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {
  titleOfPage="Thêm Học Viên"
  addStudentForm=new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthday: new FormControl('',Validators.required),
    sex: new FormControl(Validators.required),
    address: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl('',[Validators.required, Validators.email]),
    level: new FormControl('',Validators.required),
    departmentId: new FormControl('',Validators.required),
    courseId: new FormControl('',Validators.required),
  })
  picker=true
  ShowSpinner=false;

  Department:Department[]=[]
  Course:Course[]=[]
  constructor(
    private dataDepartmentService:ManageDepartmentService,
    private dataCourseService: ManageCourseService,
    private dataService:ManageStudentService,
    private dialogRef: MatDialogRef<AddStudentDialogComponent>,) { 
    }

  ngOnInit(): void {
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
    this.dataCourseService.GetAllCourse().subscribe(
      res=>{
        this.Course=res
      }
    )
  }
  confirm(student:any){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
    if(this.addStudentForm.invalid){
      this.addStudentForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none' 
     /* if(student.sex==true){
        student.sex=true
      }
      else{
        student.sex=false
      }*/
      this.ShowSpinner=true
      console.log(this.addStudentForm.value);
      
      this.dataService.AddStudent(student).subscribe(
        res=>{
          this.ShowSpinner=false
          this.dialogRef.close(res);
          alert('Thêm Học Viên Thành Công')
        },
        err=>{
          console.log(err.error);
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
          alert('Thêm Học Viên Thất Bại Vui Lòng Thử Lại')   
        }
      )
    }   
  }
  closed(){
    this.dialogRef.close();
  }
}
