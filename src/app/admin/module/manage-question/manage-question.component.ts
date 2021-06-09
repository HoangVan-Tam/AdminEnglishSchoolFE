import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/classes/question.model';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';
import { ManageQuestionService } from '../../../services/manage-question/manage-question.service';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss']
})
export class ManageQuestionComponent implements OnInit {
  titleOfPage='Quản Lý Câu Hỏi'
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
  Question: Question[] = [];
  constructor(
    private dataService:ManageQuestionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.Question=[]
    this.dataService.GetAllQuestion().subscribe(
      res=>{ 
        this.ShowSpinner=false
        this.Question=res      
      }
    )
  }
  
  key:string='questionId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  OpenAddQuestionDialog(){
    let dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      height: '95vh',
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ShowSpinner=true
          this.dataService.GetAllQuestion().subscribe(
            res=>{
              this.ShowSpinner=false
              this.Question=res
            }
          )
        }   
      }
    ) 
  }

  OpenEditQuestionDialog(questions:any){
    let dialogRef = this.dialog.open(EditQuestionDialogComponent, {
      height: '95vh',
      width: '60vw',
      data:{questions}
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ShowSpinner=true
          this.Question=[]
          this.dataService.GetAllQuestion().subscribe(
            res=>{
              this.ShowSpinner=false
              this.Question=res
            }
          )
        }   
      }
    ) 
  }
}
