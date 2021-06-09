import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recruitment } from 'src/app/classes/recruitment.model';
import { ManageRecruitmentService } from '../../../../services/manage-recruitment/manage-recruitment.service';

@Component({
  selector: 'app-edit-recruitment-dialog',
  templateUrl: './edit-recruitment-dialog.component.html',
  styleUrls: ['./edit-recruitment-dialog.component.scss']
})
export class EditRecruitmentDialogComponent implements OnInit {
  titleOfPage="Thêm Tuyển Dụng"
  editRecruitmentForm=new FormGroup({
    id: new FormControl({value:this.data.recruitment.id, disabled:true},Validators.required),
    vacancies: new FormControl(this.data.recruitment.vacancies,Validators.required),
    jobDecription: new FormControl(this.data.recruitment.jobDecription,Validators.required),
    jobRequirements: new FormControl(this.data.recruitment.jobRequirements,Validators.required),
    rightsOfTheEmployees: new FormControl(this.data.recruitment.rightsOfTheEmployees,Validators.required),
    address: new FormControl(this.data.recruitment.address,Validators.required),
    amount: new FormControl(this.data.recruitment.amount,Validators.required),
    complete: new FormControl(this.data.recruitment.complete,Validators.required),
  })
  ShowSpinner=false
  complete=false
  uncomplete=false
  constructor(
    private dataRecruitmentService: ManageRecruitmentService,
    private dialogRef: MatDialogRef<EditRecruitmentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:{recruitment:Recruitment}) { 
    }

  ngOnInit(): void {
    if(this.data.recruitment.complete==true){
      this.complete=true
    }
    else{
      this.uncomplete=true
    }
  }
  confirm(recruitment:Recruitment){
    recruitment.id=this.data.recruitment.id
    recruitment.complete=false
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
    this.ShowSpinner=true
    this.dataRecruitmentService.UpdateRecruitment(recruitment).subscribe(
      res=>{
        this.ShowSpinner=false
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'  
        this.dialogRef.close(res);
        alert('Cập Nhật Tuyển Dụng Thành Công')
      },
      err=>{
        this.ShowSpinner=false
        alert("Cập Nhật Tuyển Dụng Thất Bại")
        console.log(err);       
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
      }
    )
  }
  closed(){
    this.dialogRef.close();
  }
}
