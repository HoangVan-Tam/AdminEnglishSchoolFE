import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { AddClassDialogComponent } from './add-class-dialog/add-class-dialog.component';
import { EditClassDialogComponent } from './edit-class-dialog/edit-class-dialog.component';
import { ManageCourseService } from '../../../services/manage-course/manage-course.service';
import { ManageClassModule } from './manage-class.module';
import { ManageClassService } from 'src/app/services/manage-class/manage-course.service';
import { Class } from 'src/app/classes/class.model';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.scss']
})
export class ManageClassComponent implements OnInit {
  titleOfPage='Quản Lý Lớp Học';
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
  Class!:any[]
  ShowSpinner= false;
  constructor(
    private dataService:ManageClassService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Class=[]
    this.ShowSpinner=true
    this.dataService.GetAllClass().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Class=res
    })
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  OpenAddClassDialog(){
    let dialogRef = this.dialog.open(AddClassDialogComponent, {
      height: '80vh',
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

  OpenEditClassDialog(classes: any){
    let dialogRef = this.dialog.open(EditClassDialogComponent, {
      height: '80vh',
      width: '80vw',
      data:{classes}
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
