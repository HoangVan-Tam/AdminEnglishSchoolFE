import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRegisterCourseDialogComponent } from './add-registercourse-dialog/add-registercourse-dialog.component';
import { EditScoreDialogComponent } from './edit-score-dialog/edit-score-dialog.component';
import { StudentDetailService } from '../../../services/student-detail/student-detail.service';
import { Student } from 'src/app/classes/student.model';
import { ActivatedRoute } from '@angular/router';
import { CourseDetail } from 'src/app/classes/coursedetail.model';
import { ScoreResult } from 'src/app/classes/scoreresult.model';

@Component({
  selector: 'app-manage-student',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  titleOfPage="Thông Tin Học Viên"
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
  ShowSpinnerInfo=true
  ShowSpinner=true
  Student!:Student
  DetailCourseStudent:CourseDetail[]=[]
  ScoreDetail:ScoreResult[]=[]
  CheckParent=true
  constructor(
    private route: ActivatedRoute,
    private dataService:StudentDetailService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    document.getElementsByClassName('detail__container')[0].classList.add('hide')
    this.ShowSpinner=true
    this.ShowSpinnerInfo=true
    this.Student=new Student
    this.DetailCourseStudent=[]
    let id = this.route.snapshot.params.id;
    this.dataService.GetStudent(id).subscribe(
      res=>{
        this.ShowSpinnerInfo=false
        document.getElementsByClassName('detail__container')[0].classList.remove('hide')
        this.Student=res
      }
    )
    this.dataService.GetAllCourseOfStudent(id).subscribe(
      res=>{
        this.ShowSpinner=false
        this.DetailCourseStudent=res
      },
      err=>{
        console.log(err.error);
      }
    )

    
  }
  key:string='dayStart'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  openDialogRegisterCourse(){
    const dialogRef=this.dialog.open(AddRegisterCourseDialogComponent, {
      width:"90%",
      height:"85vh",
      data:{
        studentId:this.Student.studentId,
        departmentId:this.Student.departmentId,
      }
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        if(res!=null){
          this.ngOnInit()
        }
      }
    )
  }

  OpenEditScoreDialog(scores:any){
    const dialogRef=this.dialog.open(EditScoreDialogComponent, {
      width:"25%",
      height:"67vh",
      data:{scores}
    });
  }

  SeeScore(courseDetailId:any){
    document.getElementsByClassName("student-score")[0].classList.remove('hide')
    document.getElementsByClassName("student-detail")[0].classList.add("hide")
    document.getElementsByClassName("button")[0].classList.remove("hide")
    this.ShowSpinner=true
    this.dataService.GetAllScoreOfStudent(courseDetailId).subscribe(
      res=>{
        this.ShowSpinner=false
        this.ScoreDetail=res
      },
      err=>{
        console.log(err);
      }
    )
  }
  SeeDetail(){
    document.getElementsByClassName("student-score")[0].classList.add('hide')
    document.getElementsByClassName("student-detail")[0].classList.remove("hide")
    document.getElementsByClassName("button")[0].classList.add("hide")
  }

  SeeAttendance(courseDetailId:any){
    alert("Chức năng đang Phát Triển")
  }
}
