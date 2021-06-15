import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Schedule } from 'src/app/classes/schedule.model';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent implements OnInit {
  titleOfPage='Cập Nhật Thông Tin Khóa Học'
  editCourseForm=new FormGroup({
    id: new FormControl({value: this.data.courses.id, disabled:true},Validators.required),
    name: new FormControl(this.data.courses.name,Validators.required),
    title: new FormControl(this.data.courses.title, Validators.required),
    headContent:new FormControl(this.data.courses.headContent, Validators.required),
    bodyContent: new FormControl(this.data.courses.bodyContent, Validators.required),
    numberOfWeeks: new FormControl(this.data.courses.numberOfMonths,Validators.required),
    tuition: new FormControl(this.data.courses.tuition,Validators.required),
    note: new FormControl(this.data.courses.note),
    discount: new FormControl(this.data.courses.discount,Validators.required),
    /*schedule1: new FormControl(this.data.courses.schedules[0]?.day,Validators.required),
    timeStart1: new FormControl(this.data.courses.schedules[0]?.timeStart,Validators.required),
    timeEnd1: new FormControl(this.data.courses.schedules[0]?.timeEnd,Validators.required),
    schedule2: new FormControl(this.data.courses.schedules[1]?.day,Validators.required),
    timeStart2: new FormControl(this.data.courses.schedules[1]?.timeStart,Validators.required),
    timeEnd2: new FormControl(this.data.courses.schedules[1]?.timeEnd,Validators.required),
    schedule3: new FormControl(this.data.courses.schedules[2]?.day),
    timeStart3: new FormControl(this.data.courses.schedules[2]?.timeStart),
    timeEnd3: new FormControl(this.data.courses.schedules[2]?.timeEnd),*/
    theOpeningDay: new FormControl(this.data.courses.theOpeningDay,Validators.required),
    //departmentId: new FormControl(this.data.courses.departmentId,Validators.required),
  })
  Schedule!:Schedule[]
  ShowSpinner=false
  constructor(
    private dataService:ManageCourseService,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {courses: Course}) {  }

  ngOnInit(): void {
    
  }
  confirm(course:any){
    if(this.editCourseForm.invalid){
      this.editCourseForm.markAllAsTouched()
    }
    else{
      /*this.Schedule=[]
      this.Schedule.push({courseId:this.data.courses.schedules[0].courseId, scheduleId:this.data.courses.schedules[0].scheduleId, day:course.schedule1, timeStart:course.timeStart1, timeEnd: course.timeEnd1})
      this.Schedule.push({courseId:this.data.courses.schedules[1].courseId, scheduleId:this.data.courses.schedules[1].scheduleId, day:course.schedule2, timeStart:course.timeStart2, timeEnd: course.timeEnd2})
      if(course.schedule3!=null){
        this.Schedule.push({courseId:this.data.courses.schedules[2]?.courseId, scheduleId:this.data.courses.schedules[2]?.scheduleId, day:course.schedule3, timeStart:course.timeStart3, timeEnd: course.timeEnd3})
      }
      course.schedules=this.Schedule*/
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'  
      this.ShowSpinner=true
      course.id=this.data.courses.id
      console.log(course);
      
      this.dataService.UpdateCourse(course).subscribe(
        res=>{
          alert('Cập Nhật Thành Công')
          this.dialogRef.close(1);
          this.ShowSpinner=false
        },
        err=>{
          alert('Cập Nhật Thất Bại')
          this.ShowSpinner=false
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
