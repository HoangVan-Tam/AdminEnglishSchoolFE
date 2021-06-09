import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageDepartmentService } from '../../../../services/manage-department/manage-department.service';

@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['./edit-department-dialog.component.scss']
})
export class EditDeparmentDialogComponent implements OnInit {
  titleOfPage='Cập Nhật Thông Tin Trung Tâm'
  editDepartmentForm=new FormGroup({
    id:new FormControl({value: this.data.departments.id, disabled:true}, Validators.required),
    city: new FormControl(this.data.departments.city,Validators.required),
    name: new FormControl(this.data.departments.name,Validators.required),
    address: new FormControl(this.data.departments.address,Validators.required),
    detail: new FormControl(this.data.departments.detail,Validators.required),
  })
  ShowSpinner=false
  constructor(
    private dataService: ManageDepartmentService,
    private dialogRef: MatDialogRef<EditDeparmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {departments: any}) {  }

  ngOnInit(): void {  
  }

  confirm(department:any){
    document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
    this.ShowSpinner=true
    department.id=this.data.departments.id
    this.dataService.UpdateDepartment(department).subscribe(
      res=>{
        alert('Cập Nhật Thành Công')
        this.dialogRef.close(res);
        this.ShowSpinner=false
      },
      err=>{
        alert('Cập Nhật Thất Bại')
        document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
      }
    )
  }
  closed(){
    this.dialogRef.close();
  }
}
