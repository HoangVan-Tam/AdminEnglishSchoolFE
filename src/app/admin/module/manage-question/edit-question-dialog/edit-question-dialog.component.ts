import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/classes/question.model';
import { ManageQuestionService } from '../../../../services/manage-question/manage-question.service';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent implements OnInit ,AfterViewInit {
  titleOfPage='Cập Nhật Câu Hỏi'
  avatar:any
  rightAnswerTemp:any
  editQuestionForm=new FormGroup({
    questionId:new FormControl({value: this.data.questions.questionId, disabled:true}, Validators.required),
    questionDetail: new FormControl(this.data.questions.questionDetail,Validators.required),
    level: new FormControl(this.data.questions.level,Validators.required),
    answer1: new FormControl(this.data.questions.answer1,Validators.required),
    answer2: new FormControl(this.data.questions.answer2,Validators.required),
    answer3: new FormControl(this.data.questions.answer3,Validators.required),
    answer4: new FormControl(this.data.questions.answer4,Validators.required),
    rightAnswer: new FormControl(Validators.required)
  })
  ShowSpinner=false
  constructor(
    private dialogRef: MatDialogRef<EditQuestionDialogComponent>,
    private dataService: ManageQuestionService,
    @Inject(MAT_DIALOG_DATA) public data: {questions: Question}) { }
  ngAfterViewInit(): void {
    if(this.data.questions.rightAnswer==this.data.questions.answer1){
      this.editQuestionForm.get('rightAnswer')?.patchValue(this.data.questions.rightAnswer="A")
    }
    else if(this.data.questions.rightAnswer==this.data.questions.answer2){
      this.editQuestionForm.get('rightAnswer')?.patchValue(this.data.questions.rightAnswer="B")
    }
    else if(this.data.questions.rightAnswer==this.data.questions.answer3){
      this.editQuestionForm.get('rightAnswer')?.patchValue(this.data.questions.rightAnswer="C")
    }
    else if(this.data.questions.rightAnswer==this.data.questions.answer4){
      this.editQuestionForm.get('rightAnswer')?.patchValue(this.data.questions.rightAnswer="D")
    }
  }

  ngOnInit(): void {
    
  }

  confirm(question:Question){
    if(this.editQuestionForm.invalid){
      this.editQuestionForm.markAllAsTouched()
    }
    else{
      if(question.rightAnswer=="A"){
        question.rightAnswer=question.answer1
      }
      else if(question.rightAnswer=="B"){
        question.rightAnswer=question.answer2
      }
      else if(question.rightAnswer=="C"){
        question.rightAnswer=question.answer3
      }
      if(question.rightAnswer=="D"){
        question.rightAnswer=question.answer4
      }
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      question.questionId=this.data.questions.questionId
      this.dataService.UpdateQuestion(question).subscribe(
        res=>{
          this.dialogRef.close(res);
          alert('Cập Nhật Thành Công')
          this.ShowSpinner=false
        },
        err=>{
          console.log(err)  
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }   
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
