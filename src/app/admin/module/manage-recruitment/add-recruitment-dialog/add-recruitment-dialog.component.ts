import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Recruitment } from 'src/app/classes/recruitment.model';
import { ManageRecruitmentService } from '../../../../services/manage-recruitment/manage-recruitment.service';

@Component({
  selector: 'app-add-recruitment-dialog',
  templateUrl: './add-recruitment-dialog.component.html',
  styleUrls: ['./add-recruitment-dialog.component.scss']
})
export class AddRecruitmentDialogComponent implements OnInit {
  titleOfPage="Thêm Tuyển Dụng"
  addRecruitmentForm=new FormGroup({
    vacancies: new FormControl('',Validators.required),
    jobDecription: new FormControl('',Validators.required),
    jobRequirements: new FormControl('',Validators.required),
    rightsOfTheEmployees: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required),
  })
  ShowSpinner=false
  constructor(
    private dataRecruitmentService: ManageRecruitmentService,
    private dialogRef: MatDialogRef<AddRecruitmentDialogComponent>,) { 
    }

  ngOnInit(): void {
  }
  confirm(recruitment:Recruitment){
    if(this.addRecruitmentForm.invalid){
      this.addRecruitmentForm.markAllAsTouched()
    }
    else{
      recruitment.complete=false
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      this.dataRecruitmentService.AddRrecruitment(recruitment).subscribe(
        res=>{
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'  
          this.dialogRef.close(res);
          alert('Thêm Tuyển Dụng Thành Công')
        },
        err=>{
          alert("Thêm Tuyển Dụng Thất Bại")
          console.log(err);
          
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
