import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Event} from 'src/app/classes/event.model';
import { ManageEventService } from 'src/app/services/manage-event/manage-event.service';


@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {
  titleOfPage="Thêm Sự Kiện-Tin Tức"
  ShowSpinner=false
  imageUrl:string='/assets/img/img-default.png'
  addEventForm=new FormGroup({
    title: new FormControl('',Validators.required),
    headContent: new FormControl('',Validators.required),
    bodyContent: new FormControl('',Validators.required),
    image: new FormControl(''),
  })
  selectedFiles!:File
  constructor(
    private dataEventService:ManageEventService,
    private dialogRef: MatDialogRef<AddEventDialogComponent>,) { 
    }

  ngOnInit(): void {
  }

  processFile(event:any) {
    this.selectedFiles=event.target.files[0];
    var reader= new FileReader
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result
    }
    reader.readAsDataURL(this.selectedFiles)
  }

  confirm(event:Event){
    if(this.addEventForm.invalid){
      this.addEventForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      event.postDateClient=new Date().toLocaleTimeString()
      if(this.selectedFiles!=undefined){
        this.dataEventService.AddEventWithImage(event,this.selectedFiles).subscribe(
          res=>{
            this.ShowSpinner=false
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
            alert("Thêm Sự Kiện Thành Công")
            this.dialogRef.close(1)
          },
          err=>{
            this.ShowSpinner=false
            alert("Thêm Sự Kiện Thất Bại")
            console.log(err);
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'       
          }
        )
      }
      else{
        this.dataEventService.AddEvent(event).subscribe(
          res=>{
            this.ShowSpinner=false
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
            alert("Thêm Sự Kiện Thành Công")
            this.dialogRef.close(1)
          },
          err=>{
            this.ShowSpinner=false
            alert("Thêm Sự Kiện Thất Bại")
            console.log(err);
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'       
          }
        )
      }
      
      
      /*this.dataEventService.AddEvent(fd, event).subscribe(
        res=>{
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
          alert("Thêm Sự Kiện Thành Công")
        },
        err=>{
          this.ShowSpinner=false
          alert("Thêm Sự Kiện Thất Bại")
          console.log(err);
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }
      )*/
    }
    
  }
  closed(){
    this.dialogRef.close();
  }
}
