import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recruitment } from 'src/app/classes/recruitment.model';
import { AddRecruitmentDialogComponent } from './add-recruitment-dialog/add-recruitment-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditRecruitmentDialogComponent } from './edit-recruitment-dialog/edit-recruitment-dialog.component';
import { ManageRecruitmentRoutingModule } from './manage-recruitment-routing.module';
import { ManageRecruitmentService } from '../../../services/manage-recruitment/manage-recruitment.service';

@Component({
  selector: 'app-manage-recruitment',
  templateUrl: './manage-recruitment.component.html',
  styleUrls: ['./manage-recruitment.component.scss']
})
export class ManageRecruitmentComponent implements OnInit {
  titleOfPage='Quản Lý Tuyển Dụng'
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
  ShowSpinner!:boolean
  Recruitments!:Recruitment[]
  constructor(
    private dialog:MatDialog,
    private dataRecruitmentService:ManageRecruitmentService,
  ) { }

  ngOnInit(): void {
    this.ShowSpinner=true
    this.Recruitments=[]
    this.dataRecruitmentService.GetAllrecruitment().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Recruitments=res
      }
    )
  }
  key:string='id'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  OpenAddRecruitmentDialog(){
    let dialogRef = this.dialog.open(AddRecruitmentDialogComponent, {
      height: '95vh',
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }

  DeleteRecruitment(id:number){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '25vh',
      width: '60vw',
      data:{id}
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }
  OpenEditRecruimentDialog(recruitment:Recruitment){
    let dialogRef = this.dialog.open(EditRecruitmentDialogComponent, {
      height: '95vh',
      width: '60vw',
      data:{recruitment}
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
