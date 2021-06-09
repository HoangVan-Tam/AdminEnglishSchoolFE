import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-score-dialog',
  templateUrl: './edit-score-dialog.component.html',
  styleUrls: ['./edit-score-dialog.component.scss']
})
export class EditScoreDialogComponent implements OnInit {
  titleOfPage='Cập Nhật Điểm Thi'
  avatar:any
  constructor(
    private dialogRef: MatDialogRef<EditScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {scores: any}) {  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  confirm(){
    this.dialogRef.close();
  }
  closed(){
    this.dialogRef.close();
  }
}
