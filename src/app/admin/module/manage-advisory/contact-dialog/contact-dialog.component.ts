import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Advisory } from 'src/app/classes/advisory.model';
import { Question } from 'src/app/classes/question.model';
import { ManageAdvisoryService } from 'src/app/services/manage-advisory/manage-advisory.service';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';
import { ManageQuestionService } from '../../../../services/manage-question/manage-question.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
  titleOfPage="Thông Tin Đăng Ký Tư Vấn"
  ShowSpinner=false
  constructor(
    private dataAdvisoryService: ManageAdvisoryService,
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {advisory: Advisory}) { 
    }

  ngOnInit(): void {
  }

  closed(){
    this.dialogRef.close()
  }

  confirm(){
    this.ShowSpinner=true
    this.data.advisory.status="Đã liên lạc"
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none' 
    this.dataAdvisoryService.UpdateAdvisory(this.data.advisory).subscribe(
      res=>{
        this.ShowSpinner=false
        this.dialogRef.close(res)
      }
    )
  }
}
