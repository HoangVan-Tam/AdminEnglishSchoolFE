import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { Department } from 'src/app/classes/department.model';
import { Employee } from 'src/app/classes/employee.model';
import { Schedule } from 'src/app/classes/schedule.model';
import { ManageClassService } from 'src/app/services/manage-class/manage-course.service';
import { ManageDepartmentService } from 'src/app/services/manage-department/manage-department.service';
import { ManageEmployeeService } from 'src/app/services/manage-employee/manage-employee.service';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit-class-dialog.component.html',
  styleUrls: ['./edit-class-dialog.component.scss']
})
export class EditClassDialogComponent implements OnInit {
  titleOfPage='Cập Nhật Thông Tin Lớp Học'
  editClassForm=new FormGroup({
    id: new FormControl({value: this.data.classes.id, disabled:true},Validators.required),
    name: new FormControl(this.data.classes.name,Validators.required),
    courseId:new FormControl(this.data.classes.courseId, Validators.required),
    teacherId:new FormControl(this.data.classes.teacherId, Validators.required),
    schedule1: new FormControl(this.data.classes.schedules[0]?.day,Validators.required),
    timeStart1: new FormControl(this.data.classes.schedules[0]?.timeStart,Validators.required),
    timeEnd1: new FormControl(this.data.classes.schedules[0]?.timeEnd,Validators.required),
    schedule2: new FormControl(this.data.classes.schedules[1]?.day,Validators.required),
    timeStart2: new FormControl(this.data.classes.schedules[1]?.timeStart,Validators.required),
    timeEnd2: new FormControl(this.data.classes.schedules[1]?.timeEnd,Validators.required),
    schedule3: new FormControl(this.data.classes.schedules[2]?.day),
    timeStart3: new FormControl(this.data.classes.schedules[2]?.timeStart),
    timeEnd3: new FormControl(this.data.classes.schedules[2]?.timeEnd),
    departmentId: new FormControl(this.data.classes.departmentId,Validators.required),
    note:new FormControl(this.data.classes.note)
  })
  Teacher!: Employee[]
  Department!:Department[]
  Course!:Course[]
  Schedule!:any[]
  ShowSpinner=false
  constructor(
    private dataTeacherService:ManageEmployeeService,
    private dataDepartmentService:ManageDepartmentService,
    private dataCourseService:ManageCourseService,
    private dataService:ManageClassService,
    private dialogRef: MatDialogRef<EditClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classes: any}) {  }

  ngOnInit(): void {
    this.dataDepartmentService.GetAllDepartment().subscribe(
      res=>{
        this.Department=res
      }
    )
    this.dataCourseService.GetAllCourse().subscribe(
      res=>this.Course=res
    )
    this.dataTeacherService.GetAllTeacherByDepartmentId(this.editClassForm.get("departmentId")?.value).subscribe(
      res=>this.Teacher=res
    )
    
  }
  confirm(course:any){
    if(this.editClassForm.invalid){
      this.editClassForm.markAllAsTouched()
    }
    else{
      this.Schedule=[]
      this.Schedule.push({courseId:this.data.classes.schedules[0].courseId, scheduleId:this.data.classes.schedules[0].scheduleId, day:course.schedule1, timeStart:course.timeStart1, timeEnd: course.timeEnd1})
      this.Schedule.push({courseId:this.data.classes.schedules[1].courseId, scheduleId:this.data.classes.schedules[1].scheduleId, day:course.schedule2, timeStart:course.timeStart2, timeEnd: course.timeEnd2})
      if(course.schedule3!=null){
        this.Schedule.push({courseId:this.data.classes.schedules[2]?.courseId, scheduleId:this.data.classes.schedules[2]?.scheduleId, day:course.schedule3, timeStart:course.timeStart3, timeEnd: course.timeEnd3})
      }
      course.schedules=this.Schedule
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'  
      this.ShowSpinner=true
      course.id=this.data.classes.id
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
