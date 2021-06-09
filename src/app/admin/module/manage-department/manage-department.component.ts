import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/classes/department.model';
import { AddDeparmentDialogComponent } from './add-department-dialog/add-department-dialog.component';
import { EditDeparmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { ManageDepartmentService } from '../../../services/manage-department/manage-department.service';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.scss']
})
export class ManageDepartmentComponent implements OnInit {
  titleOfPage="Quản Lý Trung Tâm"
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
  Department:Department[]=[]
  constructor(
    private dataService:ManageDepartmentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataService.GetAllDepartment().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Department=res  
      },
      err=>{
        console.log(err);
      }
    )
  }
  key:string='id'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  OpenAddDepartmentDialog(){
    let dialogRef = this.dialog.open(AddDeparmentDialogComponent, {
      height: '95vh',
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ShowSpinner=true
          this.dataService.GetAllDepartment().subscribe(
            res=>{
              this.ShowSpinner=false
              this.Department=res
            }
          )
        }   
      }
    ) 
  }
  OpenEditDepartmentDialog(departments: any){
    let dialogRef = this.dialog.open(EditDeparmentDialogComponent, {
      height: '95vh',
      width: '60vw',
      data: {departments},
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.Department=[]
          this.ShowSpinner=true
          this.dataService.GetAllDepartment().subscribe(
            res=>{
              this.ShowSpinner=false;
              this.Department=res;
            },
            err=>{
              alert('Vui Lòng Thử Lại')
            }
          )
        }
      }
    )
  }
}
