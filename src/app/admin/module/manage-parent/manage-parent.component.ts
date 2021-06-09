import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parent } from 'src/app/classes/parent.model';
import { ManageParentService } from 'src/app/services/manage-parent/manage-parent.service';
import { AddParentDialogComponent } from '../student-detail/add-parent-dialog/add-parent-dialog.component';
import { AddStudentOfParentDialogComponent } from './add-studentofparent-dialog/add-studentofparent-dialog.component';
import { EditStudentOfStudentDialogComponent } from './edit-parent-dialog/edit-parent-dialog.component';

@Component({
  selector: 'app-manage-parent',
  templateUrl: './manage-parent.component.html',
  styleUrls: ['./manage-parent.component.scss']
})
export class ManageParentComponent implements OnInit {
  titleOfPage='Cập Nhật Thông Tin'
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
  ShowSpinner=true
  
  Parents!:Parent[]
  constructor(
    private dataService:ManageParentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Parents=[]
    this.dataService.GetAllParent().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Parents=res
      }
    )
  }
  key:string='parentId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  openDialogAddParent(){
    const dialogRef=this.dialog.open(AddParentDialogComponent,{
      width:"70%",
      height:"90vh",
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        console.log(res);
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }

  OpenAddStudentOfParentDialog(){
    let dialogRef=this.dialog.open(AddStudentOfParentDialogComponent,{
      width:"70%",
      height:"90vh",
      data:{parent}
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

  OpenEditStudenOfParentDialog(parent:any){
    let dialogRef=this.dialog.open(EditStudentOfStudentDialogComponent,{
      width:"50%",
      height:"95vh",
      data:{parent}
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
