import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/classes/event.model';
import { ManageEventService } from 'src/app/services/manage-event/manage-event.service';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent implements OnInit{
  titleOfPage="Cập Nhật Sự Kiện"
  ShowSpinner=false
  addEventForm=new FormGroup({
    id:new FormControl({value:this.data.event.id, disabled:true},Validators.required),
    title: new FormControl(this.data.event.title,Validators.required),
    headContent: new FormControl(this.data.event.headContent,Validators.required),
    bodyContent: new FormControl(this.data.event.bodyContent,Validators.required),
    postDate:new FormControl({value:this.data.event.postDate, disabled:true}, Validators.required),
    image: new FormControl(),
  })
  imageUrl!:string
  selectedFiles!:File
  constructor(
    private dataEventService:ManageEventService,
    private dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {event: Event},) { }

  ngOnInit(): void {  
    if(this.data.event.image=="" || this.data.event.image==null){
      this.imageUrl='/assets/img/img-default.png'
    }
    else{
      this.imageUrl ='https://englishschool.azurewebsites.net/uploads/'+this.data.event.image
    }
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
      this.addEventForm.markAllAsTouched
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      event.id=this.data.event.id
      event.postDate=this.data.event.postDate
      event.image=this.data.event.image
      if(this.selectedFiles==undefined){
        this.dataEventService.UpdateEvent(event).subscribe(
          res=>{
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
            this.ShowSpinner=false
            this.dialogRef.close(res);
            alert('Cập Nhật Sự Kiện Thành Công')
          },
          err=>{
            this.ShowSpinner=false
            alert("Cập Nhật Sự Kiện Thất Bại")
            console.log(err);
            
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
          }
        )
      }
      else{
        this.dataEventService.UpdateEventWithImage(event, this.selectedFiles).subscribe(
          res=>{
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline' 
            this.ShowSpinner=false
            this.dialogRef.close(res);
            alert('Cập Nhật Sự Kiện Thành Công')
          },
          err=>{
            this.ShowSpinner=false
            alert("Cập Nhật Sự Kiện Thất Bại")
            console.log(err);
            
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
          }
        )
      }   
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
