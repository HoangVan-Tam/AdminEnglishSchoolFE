import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherDialogComponent } from './add-teacher-dialog/add-teacher-dialog.component';
import { Employee } from 'src/app/classes/employee.model';
import { EditTeacherDialogComponent } from './edit-teacher-dialog/edit-teacher-dialog.component';
import { ManageEmployeeService } from 'src/app/services/manage-employee/manage-employee.service';
import { AddRegisterCourseDialogComponent } from '../student-detail/add-registercourse-dialog/add-registercourse-dialog.component';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.scss']
})
export class ManageTeacherComponent implements OnInit {
  titleOfPage="Quản Lý Giáo Viên"
  search:any
  Teachers:Employee[]=[]
  pageChanged:number=1
  maxSize: number = 7;
  directionLinks: boolean = true;
  autoHide: boolean = false;
  responsive: boolean = true;
  labels: any = {
      previousLabel: '',
      nextLabel: '',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  ShowSpinner=true;
  constructor(
    private dataTeacherService:ManageEmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ShowSpinner=true
    this.Teachers=[]
    this.dataTeacherService.GetAllTeacher().subscribe(
      res=>{       
        this.ShowSpinner=false
        this.Teachers=res         
      }
    )
  }
  key:string='userId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  openEditStudentDetailDialog(teacher:any){
    const editStudentDialogRef=this.dialog.open(EditTeacherDialogComponent,{
      width:"60vw",
      height:"95vh",
      data:{
        teacher:teacher,
      }
    });
    editStudentDialogRef.afterClosed().subscribe(
      res => {
        if(res!=null)
        this.ngOnInit()
      }
    );  
  }
  openAddStudentDialog(){
    let dialogRef=this.dialog.open(AddTeacherDialogComponent,{
      width:"60vw",
      height:"95vh",
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ShowSpinner=true
          this.ngOnInit()
        }   
      }
    )
  }
  openDialogRegisterCourse(info:Employee){
    const dialogRef=this.dialog.open(AddRegisterCourseDialogComponent, {
      width:"70%",
      height:"85vh",
      data:{
        studentId:info.userId,
        from:"Teacher",
        departmentId:info.departmentId,
      }
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }
}
