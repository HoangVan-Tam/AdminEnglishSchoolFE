import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/classes/question.model';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';
import { ManageQuestionService } from '../../../../services/manage-question/manage-question.service';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent implements OnInit {
  titleOfPage="Thêm Câu Hỏi"
  addQuestionForm=new FormGroup({
    questionDetail: new FormControl('',Validators.required),
    level: new FormControl('',Validators.required),
    answer1: new FormControl('',Validators.required),
    answer2: new FormControl('',Validators.required),
    answer3: new FormControl('',Validators.required),
    answer4: new FormControl('',Validators.required),
    rightAnswer: new FormControl('',Validators.required)
  })
  ShowSpinner=false
  constructor(
    private _dataService: ManageQuestionService,
    private dialogRef: MatDialogRef<AddQuestionDialogComponent>,) { 
    }

  ngOnInit(): void {
  }
  confirm(Question:Question){
    if(Question.rightAnswer=="A"){
      Question.rightAnswer=Question.answer1
    }
    else if(Question.rightAnswer=="B"){
      Question.rightAnswer=Question.answer2
    }
    else if(Question.rightAnswer=="C"){
      Question.rightAnswer=Question.answer3
    }
    else if(Question.rightAnswer=="D"){
      Question.rightAnswer=Question.answer4
    }
    
    if(this.addQuestionForm.invalid){
      this.addQuestionForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      this._dataService.AddQuestion(Question).subscribe(
        res=>{
          this.ShowSpinner=false
          this.dialogRef.close(res);
          alert('Thêm Câu Hỏi Thành Công')
        },
        err=>{
          alert(err)
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
