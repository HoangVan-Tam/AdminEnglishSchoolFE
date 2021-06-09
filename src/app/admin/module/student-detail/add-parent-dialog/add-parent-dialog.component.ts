import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/classes/student.model';
import { ManageParentService } from 'src/app/services/manage-parent/manage-parent.service';
import { ManageStudentService } from '../../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-add-parent-dialog',
  templateUrl: './add-parent-dialog.component.html',
  styleUrls: ['./add-parent-dialog.component.scss']
})
export class AddParentDialogComponent implements OnInit {
  titleOfPage="Thêm Phụ Huynh Học Viên"
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
  addParentForm=new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    birthday: new FormControl('',Validators.required),
    sex: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    email: new FormControl('',[Validators.required,Validators.email]),
  })
  Student!:Student
  Students!:Student[]
  ShowSpinner=false
  ShowSpinnerButton=false
  OpenDialogFromStudentDetail!:boolean
  constructor(
    private dataStudentService:ManageStudentService,
    private dataParentService:ManageParentService,
    private dialogRef: MatDialogRef<AddParentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {studentId: any}) { }

  ngOnInit(): void {
    if(this.data?.studentId!=null){
      document.getElementsByClassName('step1')[0].classList.add('hide')
      document.getElementsByClassName('step2')[0].classList.remove('hide')
      document.getElementsByClassName('backstep')[0].classList.add('hide')
      this.OpenDialogFromStudentDetail=true
    }
    else{
      this.OpenDialogFromStudentDetail=false
      this.ShowSpinner=true
      this.Students=[]
      this.dataStudentService.GetAllStudent().subscribe(
        res=>{
          this.ShowSpinner=false
          this.Students=res
      })
    }
  }

  key:string='studentId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }
  nextStep(){
    if(this.Student==null){
      alert('Vui Lòng Chọn Học Viên Của Phụ Huynh')
    }
    else{
      if(this.Student.parents?.parentId!=null){   
        alert('Học Viên Này Đã Có Phụ Huynh')
      }
      else{
        var step1=document.getElementsByClassName('step1')[0].classList.add('hide')
        var step2=document.getElementsByClassName('step2')[0].classList.remove('hide')
      }
    }
  }

  backStep(){
    var step1=document.getElementsByClassName('step1')[0].classList.remove('hide')
    var step2=document.getElementsByClassName('step2')[0].classList.add('hide')
  }
  confirm(parent:any){
    this.ShowSpinnerButton=true
    document.getElementsByClassName('text__button')[0].classList.add('hide');
    if(this.OpenDialogFromStudentDetail==true){
      parent.studentId=this.data.studentId
    }
    else{
      parent.studentId=this.Student.studentId
    }
    this.dataParentService.AddParent(parent).subscribe(
      res=>{
        alert('Đăng Ký Phụ Huynh Thành Công')
        this.ShowSpinnerButton=false
        document.getElementsByClassName('text__button')[0].classList.remove('hide')
        if(this.data?.studentId==null){
          this.dialogRef.close(1)
        }
        else{
          this.dialogRef.close()
        }
      },
      err=>{
        console.log(err);
        this.ShowSpinnerButton=false
        document.getElementsByClassName('text__button')[0].classList.remove('hide')      
        alert("Đăng Ký Phụ Huynh Thất Bại")

      }
    ) 
  }
  closed(){
    this.dialogRef.close()
  }

  checkedRowTable(student:any){
    if(this.Student!=null){
      document.getElementById(this.Student.studentId)!.classList.remove('active')
    }
    this.Student=student
    document.getElementById(this.Student.studentId)?.classList.add('active') 
  }
}
