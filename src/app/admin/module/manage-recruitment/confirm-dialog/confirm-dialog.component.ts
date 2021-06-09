import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY_FACTORY } from '@angular/material/dialog';
import { Recruitment } from 'src/app/classes/recruitment.model';
import { ManageRecruitmentService } from '../../../../services/manage-recruitment/manage-recruitment.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  titleOfPage="Bạn Có Chắc Muốn Xóa Tuyển Dụng Này?"
  ShowSpinner=false
  constructor(
    private dataRecruitmentService: ManageRecruitmentService,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject (MAT_DIALOG_DATA) private data:{id:number}) { 
    }

  ngOnInit(): void {
  }
  confirm(){
    this.ShowSpinner=true
    this.dataRecruitmentService.DeleteRecruitment(this.data.id).subscribe(
      res=>{
        this.ShowSpinner=false
        document.getElementsByTagName('p')[0].style.display='inline'
        alert("Xóa Tuyển Dụng Thành Công")
        this.dialogRef.close(res)
      },
      err=>{
        alert("Xóa Thất Bại")
        document.getElementsByTagName('p')[0].style.display='inline'
      }
    )
  }
  closed(){
    this.dialogRef.close();
  }
}
