import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { ManageCourseService } from '../../../../services/manage-course/manage-course.service';
import { StudentDetailService } from '../../../../services/student-detail/student-detail.service';

@Component({
  selector: 'app-add-registercourse-dialog',
  templateUrl: './add-registercourse-dialog.component.html',
  styleUrls: ['./add-registercourse-dialog.component.scss']
})
export class AddRegisterCourseDialogComponent implements OnInit {
  titleOfPage="Đăng Ký Khóa Học Cho Học Viên"
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
  ShowSpinnerButton=false
  Courses:Course[]=[]
  RegisterCourseStudent!:any
  RegisterCourse!:any
  constructor(
    private dataCourseService:ManageCourseService,
    private dataService:StudentDetailService,
    private dialogRef: MatDialogRef<AddRegisterCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {studentId: string, from: string, departmentId: string}) { }

  ngOnInit(): void {
    if(this.data.from=="Teacher"){
      this.titleOfPage="Đăng Ký Khóa Học Cho Giáo Viên Giảng Dạy"
      const table=  document.getElementById("table1")
      if(table){
        table.style.display="none"
      }
      this.dataCourseService.GetAllCourseByUserId(this.data.departmentId).subscribe(
        res=>{
          this.ShowSpinner=false
          this.Courses=res
      })
    }
    else{
      const table2=  document.getElementById("table2")
      if(table2){
        table2.style.display="none"
      }
      this.dataCourseService.GetAllCourse().subscribe(
        res=>{
          this.ShowSpinner=false
          this.Courses=res
          console.log(res);
          
      })
    }
    
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }
  confirm(){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'
    this.ShowSpinnerButton=true
    if(this.data.from!="Teacher"){
      if(this.RegisterCourseStudent==null){
        alert('Vui Lòng Chọn Khóa Học Muốn Đăng Ký')
        this.ShowSpinnerButton=false
      }
      this.RegisterCourseStudent.studentId=this.data.studentId
      this.dataService.registerCourse(this.RegisterCourseStudent).subscribe(
        res=>{
          this.ShowSpinnerButton=false
          alert("Đăng Ký Khóa Học Thành Công")
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
          this.dialogRef.close(res)
        },
        err=>{
          console.log(err);
          this.ShowSpinnerButton=false
          if(err.error.Message=="Student has the same class schedule"){
            alert("Bị Trùng Lịch Học")
          }
          else if (err.error.Message=="Student has not completed the course"){
            alert("Học Viên Chưa Hoàn Tất Khóa Học Này")
          }
          else{
            alert("Đăng Ký Không Thành Công Vui Lòng Thử Lại")
          }
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
        }
      )
    }

    else{
      if(this.RegisterCourse==null){
        alert('Vui Lòng Chọn Khóa Học Muốn Đăng Ký')
        this.ShowSpinnerButton=false
      }
      this.RegisterCourse.userId=this.data.studentId
      this.dataService.TeacherRegisterCourse(this.RegisterCourse).subscribe(
        res=>{
          this.ShowSpinnerButton=false
          alert("Đăng Ký Khóa Học Thành Công")
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
          this.dialogRef.close(res)
        },
        err=>{
          console.log(err);
          this.ShowSpinnerButton=false
          if(err.error.Message=="Teacher has the same class schedule"){
            alert("Bị Trùng Lịch Giảng Dạy")
          }
          /*else if (err.error.Message=="Teacher has not completed the course"){
            alert("Học Viên Chưa Hoàn Tất Khóa Học Này")
          }*/
          else{
            alert("Đăng Ký Không Thành Công Vui Lòng Thử Lại")
          }
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
        }
      )
    }
  }
  closed(){
    this.dialogRef.close()
  }
  checkedRowTable(courses:any){
    if(this.data.from!="Teacher"){
      if(this.RegisterCourseStudent!=null){
        document.getElementById(this.RegisterCourseStudent.id)!.classList.remove('active')
      }
      this.RegisterCourseStudent=courses
      document.getElementById(this.RegisterCourseStudent.id)?.classList.add('active') 
    }
    else{
      if(this.RegisterCourse!=null){
        document.getElementById("2"+this.RegisterCourse.id)!.classList.remove('active')
      }
      this.RegisterCourse=courses
      document.getElementById("2"+this.RegisterCourse.id)?.classList.add('active')
    }   
  }
}