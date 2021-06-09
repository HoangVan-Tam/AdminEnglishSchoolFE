import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event } from 'src/app/classes/event.model';
import { ManageEventService } from 'src/app/services/manage-event/manage-event.service';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})

export class ManageEventComponent implements OnInit {
  titleOfPage='Quản Lý Sự Kiện-Tin Tức'
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
  Events!:Event[]
  constructor(
    private dialog:MatDialog,
    private dataEventService:ManageEventService,
  ) { }

  ngOnInit(): void {
    this.ShowSpinner=true
    this.Events=[]
    this.dataEventService.GetAllEvent().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Events=res
      }
    )
  }
  key:string='id'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  AddEvent(){
    let dialogRef=this.dialog.open(AddEventDialogComponent,{
      width:"70%",
      height:"95vh",
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }
  OpenEditEventDialog(event:Event){
    let dialogRef=this.dialog.open(EditEventDialogComponent,{
      width:"70%",
      height:"95vh",
      data:{event}
    })
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }
}
