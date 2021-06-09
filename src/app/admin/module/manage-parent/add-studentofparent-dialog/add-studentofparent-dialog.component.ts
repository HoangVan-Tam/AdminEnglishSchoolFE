import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parent } from 'src/app/classes/parent.model';
import { Student } from 'src/app/classes/student.model';
import { ManageParentService } from 'src/app/services/manage-parent/manage-parent.service';
import { ManageStudentService } from '../../../../services/manage-student/manage-student.service';

@Component({
  selector: 'app-add-studentofparent-dialog',
  templateUrl: './add-studentofparent-dialog.component.html',
  styleUrls: ['./add-studentofparent-dialog.component.scss']
})
export class AddStudentOfParentDialogComponent implements OnInit {
  titleOfPage="Thêm Học Viên Của Phụ Huynh"
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
  ShowSpinner=false;
  ShowSpinnerButton=false;
  Students!:Student[]
  Student!:Student
  constructor(
    private dataStudentService:ManageStudentService,
    private dataParentService:ManageParentService,
    private dialogRef: MatDialogRef<AddStudentOfParentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {parent: Parent}) { 
    }

  key:string='studentId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }
  ngOnInit(): void {
    this.ShowSpinner=true
    this.Students=[]
    this.dataStudentService.GetAllStudent().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Students=res
    })
  }
  confirm(){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'
    this.ShowSpinnerButton=true
    if(this.Student==null){
      this.ShowSpinnerButton=false
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
      alert('Vui Lòng Chọn Học Sinh')
    }
    else if(this.Student.parents.parentId!=null){
      this.ShowSpinnerButton=false
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
      alert('Học Sinh Này Đã Có Phụ Huynh Quản Lý')
    }
    else{
      this.dataParentService.AddStudentOfParent(this.Student.studentId, this.data.parent.parentId).subscribe(
        res=>{
          this.ShowSpinnerButton=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
          alert('Thực Hiện Thành Công')
          this.dialogRef.close(res)
        },
        err=>{
          this.ShowSpinnerButton=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'
          alert('Thực Hiện Thật Bại')
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }

  checkedRowTable(student:any){
    if(this.Student!=null){
      document.getElementById(this.Student.studentId)!.classList.remove('active')
    }
    this.Student=student
    document.getElementById(this.Student.studentId)?.classList.add('active')  
  }
}
