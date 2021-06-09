import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { ManageCourseService } from '../../../services/manage-course/manage-course.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  titleOfPage='Quản Lý Khóa Học';
  search:any
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
  Course!:Course[]
  ShowSpinner= false;
  constructor(
    private dataService:ManageCourseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Course=[]
    this.ShowSpinner=true
    this.dataService.GetAllCourse().subscribe(
      res=>{
        console.log(res);
        
        this.ShowSpinner=false
        this.Course=res
    })
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  OpenAddCourseDialog(){
    let dialogRef = this.dialog.open(AddCourseDialogComponent, {
      height: '95vh',
      width: '80vw',
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }

  OpenEditCourseDialog(courses: any){
    let dialogRef = this.dialog.open(EditCourseDialogComponent, {
      height: '95vh',
      width: '80vw',
      data:{courses}
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
