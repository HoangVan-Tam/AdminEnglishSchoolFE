import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Department } from 'src/app/classes/department.model';
import { Schedule } from 'src/app/classes/schedule.model';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {
  titleOfPage="Thêm Khóa Học"
  ShowSpinner=false
  addCourseForm=new FormGroup({
    name: new FormControl('',Validators.required),
    title: new FormControl('', Validators.required),
    headContent:new FormControl('', Validators.required),
    bodyContent: new FormControl('', Validators.required),
    numberOfMonths: new FormControl('',Validators.required),
    tuition: new FormControl('',Validators.required),
    note: new FormControl(''),
    discount: new FormControl('',Validators.required),
    schedule1: new FormControl('',Validators.required),
    timeStart1: new FormControl('',Validators.required),
    timeEnd1: new FormControl('',Validators.required),
    schedule2: new FormControl('',Validators.required),
    timeStart2: new FormControl('',Validators.required),
    timeEnd2: new FormControl('',Validators.required),
    schedule3: new FormControl(''),
    timeStart3: new FormControl(''),
    timeEnd3: new FormControl(''),
    theOpeningDay: new FormControl('',Validators.required),
    departmentId: new FormControl('',Validators.required),
  })
  Department!:Department[]
  Course!:Course
  Schedule!:any[]
  constructor(
    private dataDepartmentService:ManageDepartmentService,
    private dataService:ManageCourseService,
    private dialogRef: MatDialogRef<AddCourseDialogComponent>,) { 
    }

  ngOnInit(): void {
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
  }
  confirm(course:any){
    if(this.addCourseForm.invalid){
      this.addCourseForm.markAllAsTouched()
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
      this.dataService.AddCourse(course).subscribe(
        res=>{
          this.dialogRef.close(res);
          alert('Thêm Khóa Học Thành Công')
          this.ShowSpinner=false
        },
        err=>{
          alert(err)
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'   
          console.log(err);
           
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
