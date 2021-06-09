import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/classes/student.model';
import { AddStudentDialogComponent } from './add-student-dialog/add-student-dialog.component';
import { EditStudentDialogComponent } from './edit-student-dialog/edit-student-dialog.component';
import { ManageStudentService } from '../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {
  titleOfPage="Quản Lý Học Viên"
  search:any
  Student:Student[]=[]
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
    private dataService:ManageStudentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.Student=[]
    this.dataService.GetAllStudent().subscribe(
      res=>{        
        this.ShowSpinner=false
        this.Student=res         
      }
    )
  }
  key:string='studentId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  openEditStudentDetailDialog(students:any){
    const editStudentDialogRef=this.dialog.open(EditStudentDialogComponent,{
      width:"60vw",
      height:"95vh",
      data:{
        student:students,
      }
    });
    editStudentDialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ShowSpinner=true
          this.ngOnInit()
        }   
      }
    )  
  }
  openAddStudentDialog(){
    let dialogRef=this.dialog.open(AddStudentDialogComponent,{
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
}
