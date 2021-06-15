import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Department } from 'src/app/classes/department.model';
import { Employee } from 'src/app/classes/employee.model';
import { Schedule } from 'src/app/classes/schedule.model';
import { ManageClassService } from 'src/app/services/manage-class/manage-course.service';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageEmployeeService } from 'src/app/services/manage-employee/manage-employee.service';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss']
})
export class AddClassDialogComponent implements OnInit {
  titleOfPage="Thêm Lớp Học"
  ShowSpinner=false
  addClassForm=new FormGroup({
    name: new FormControl('',Validators.required),
    schedule1: new FormControl('',Validators.required),
    timeStart1: new FormControl('',Validators.required),
    timeEnd1: new FormControl('',Validators.required),
    schedule2: new FormControl('',Validators.required),
    timeStart2: new FormControl('',Validators.required),
    timeEnd2: new FormControl('',Validators.required),
    schedule3: new FormControl(''),
    timeStart3: new FormControl(''),
    timeEnd3: new FormControl(''),
    departmentId: new FormControl('',Validators.required),
    courseId:new FormControl('', Validators.required),
    teacherId:new FormControl('', Validators.required),
  })
  
  Teacher!: Employee[]
  Temp!:Employee[]
  Department!:Department[]
  Course!:Course[]
  Schedule!:any[]
  constructor(
    private dataTeacherService:ManageEmployeeService,
    private dataDepartmentService:ManageDepartmentService,
    private dataCourseService:ManageCourseService,
    private dataService:ManageClassService,
    private dialogRef: MatDialogRef<AddClassDialogComponent>,) { 
    }

  ngOnInit(): void {
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
    this.dataCourseService.GetAllCourse().subscribe(
      res=>this.Course=res
    )
    this.dataTeacherService.GetAllTeacher().subscribe(
      res=>{
        this.Temp=res,
        console.log(this.Temp);
      }
    )
  }


  FillterTeacher(id:any){
    this.Teacher=this.Temp.filter(p=>p.departmentId==id)
  }


  confirm(course:any){
    if(this.addClassForm.invalid){
      this.addClassForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'   
      this.ShowSpinner=true
      this.Schedule=[]
      this.Schedule.push({day:course.schedule1, timeStart:course.timeStart1, timeEnd: course.timeEnd1})
      this.Schedule.push({day:course.schedule2, timeStart:course.timeStart2, timeEnd: course.timeEnd2})
      if(course.schedule3!=""){
        this.Schedule.push({day:course.schedule3, timeStart:course.timeStart3, timeEnd: course.timeEnd3})
      }
      course.schedules=this.Schedule
      this.dataService.AddClass(course).subscribe(
        res=>{
          this.dialogRef.close(res);
          alert('Thêm Lớp Học Thành Công')
          this.ShowSpinner=false
        },
        err=>{
          if(err.message="Teacher Has The Same Schedule"){
            alert("Giáo Viên Bị Trùng Lịch Dạy")
          }
          else{
            alert("Thêm Lớp Học Thất Bại")
          }
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'   
          console.log(err);
          this.ShowSpinner=false
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
