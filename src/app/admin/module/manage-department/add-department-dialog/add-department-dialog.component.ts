import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageDepartmentService } from '../../../../services/manage-department/manage-department.service';

@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.scss']
})
export class AddDeparmentDialogComponent implements OnInit {
  titleOfPage="Thêm Trung Tâm"
  ShowSpinner=false
  addDepartmentForm=new FormGroup({
    city: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
  })
  constructor(
    private dataService: ManageDepartmentService,
    private dialogRef: MatDialogRef<AddDeparmentDialogComponent>,) { 
    }

  ngOnInit(): void {
  }
  confirm(department:any){
    if(this.addDepartmentForm.invalid){
      this.addDepartmentForm.markAllAsTouched()
    }
    else{
      document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='none'    
      this.ShowSpinner=true
      this.dataService.AddDepartment(department).subscribe(
        res=>{
          this.dialogRef.close(res);
          alert('Thêm Trung Tâm Thành Công')
          this.ShowSpinner=false
        },
        err=>{
          alert(err)
          this.ShowSpinner=false
          document.getElementsByTagName('p')[document.getElementsByTagName('p').length-1].style.display='inline'    
        }
      )
    }
  }
  closed(){
    this.dialogRef.close();
  }
}
