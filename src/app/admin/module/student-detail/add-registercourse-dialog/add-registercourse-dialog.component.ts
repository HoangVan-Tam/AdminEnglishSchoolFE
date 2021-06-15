import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/classes/course.model';
import { ManageClassService } from 'src/app/services/manage-class/manage-course.service';
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
  Class!:any[]
  RegisterCourseStudent!:any
  RegisterClassStudent!:any
  RegisterCourse!:any
  constructor(
    private dataCourseService:ManageCourseService,
    private dataService:StudentDetailService,
    private dataClassService:ManageClassService,
    private dialogRef: MatDialogRef<AddRegisterCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {studentId: string, from: string, departmentId: string}) { }

  ngOnInit(): void {
    const confirm=document.getElementById("confirm")
    if(confirm){
      confirm.style.display="none"
    }
    const back=document.getElementById("back")
    if(back){
      back.style.display="none"
    }
    const subTable2=document.getElementById("sub__table2")
    if(subTable2){
      subTable2.style.display="none"
    }
    if(this.data.from=="Teacher"){
      this.titleOfPage="Đăng Ký Khóa Học Cho Giáo Viên Giảng Dạy"
      const table=  document.getElementById("table1")
      if(table){
        table.style.display="none"
      }
      this.dataClassService.GetAllCourseByDepartmentId(this.data.departmentId).subscribe(
        res=>{
          console.log(res);
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
      })
    }
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }


  next(){
    if(this.RegisterCourseStudent==undefined){
      alert("Vui Lòng Chọn Khóa Học Đăng Ký")
    }
    else{
      this.ShowSpinner=true;
      const confirm=document.getElementById("confirm")
      if(confirm){
        confirm.style.display="inline"
      }
      if(this.data.from!="Student"){
        const back=document.getElementById("back")
        const subTable2=document.getElementById("sub__table2")
        const next=document.getElementById("next")
        const table1=  document.getElementById("table1")
        if(table1){
          table1.style.display="none"
        }
        
        if(next){
          next.style.display="none"
        }
       
        if(back){
          back.style.display="inline"
        }
        this.Class=[]
        this.dataClassService.GetAllClassByCourseIdAnDepartmentId(this.RegisterCourseStudent.id, this.data.departmentId).subscribe(
          res=>{
            console.log(res);
            this.Class=res.filter(p=>p.courseId==this.RegisterCourseStudent.id)
            this.ShowSpinner=false
          }
        )
        if(subTable2){
          subTable2.style.display="inline"
        }
      }       
    }
  }

  back(){
    this.RegisterClassStudent=undefined
    const confirm=document.getElementById("confirm")
    if(confirm){
      confirm.style.display="none"
    }
    if(this.data.from!="Teacher"){
      const back=document.getElementById("back")
      const subTable2=document.getElementById("sub__table2")
      const next=document.getElementById("next")
      if(subTable2){
        subTable2.style.display="none"
      }
      const table1=  document.getElementById("table1")
      if(table1){
        table1.style.display="inline"
      }
      
      if(next){
        next.style.display="inline"
      }
     
      if(back){
        back.style.display="none"
      }
    }
  }

  confirm(){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'
    this.ShowSpinnerButton=true
    if(this.data.from!="Teacher"){
      if(this.RegisterClassStudent==[] || this.RegisterClassStudent==undefined){
        alert("Vui Lòng Chọn Lớp Học Muốn Đăng Ký")
        this.ShowSpinnerButton=false
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
      }
      else{
        this.RegisterClassStudent.studentId=this.data.studentId
        this.RegisterClassStudent.courseId=this.RegisterCourseStudent.id
        this.RegisterClassStudent.classId=this.RegisterClassStudent.id
        this.dataService.registerCourse(this.RegisterClassStudent).subscribe(
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
              alert("Học Viên Chưa Hoàn Tất Lớp Học Này")
            }
            else{
              alert("Đăng Ký Không Thành Công Vui Lòng Thử Lại")
            }
            document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
          }
        )
      }
    }

    else{
      if(this.RegisterCourse==null){
        alert('Vui Lòng Chọn Khóa Học Muốn Đăng Ký')
        this.ShowSpinnerButton=false
      }
      else{
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
  }
  closed(){
    this.dialogRef.close()
  }
  checkedRowTable(courses:any){
    if(this.data.from!="Teacher"){
      if(this.RegisterCourseStudent!=null){
        document.getElementById(this.RegisterCourseStudent.id+"-"+this.RegisterCourseStudent.name)?.classList.remove('active')
      }
      this.RegisterCourseStudent=courses
      document.getElementById(this.RegisterCourseStudent.id+"-"+this.RegisterCourseStudent.name)?.classList.add('active') 
    }
    else{
      if(this.RegisterCourse!=null){
        document.getElementById("2"+this.RegisterCourse.id)!.classList.remove('active')
      }
      this.RegisterCourse=courses
      document.getElementById("2"+this.RegisterCourse.id)?.classList.add('active')
    }   
  }


  checkedRowTable2(classes:any){
    if(this.data.from!="Teacher"){
      if(this.RegisterClassStudent!=null){
        document.getElementById(this.RegisterClassStudent.id)?.classList.remove('active')
      }
      this.RegisterClassStudent=classes
      document.getElementById(this.RegisterClassStudent.id)?.classList.add('active') 
    }
  }
}