import { Component, OnInit } from '@angular/core';
import { Advisory } from 'src/app/classes/advisory.model';
import { Course } from 'src/app/classes/course.model';
import { ManageAdvisoryService } from 'src/app/services/manage-advisory/manage-advisory.service';

@Component({
  selector: 'app-manage-advisory',
  templateUrl: './manage-advisory.component.html',
  styleUrls: ['./manage-advisory.component.scss']
})
export class ManageAdvisoryComponent implements OnInit {
  titleOfPage='Quản Lý Đăng Ký Tư Vấn';
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
  Advisorys:Advisory[]=[]
  ShowSpinner= true;
  constructor(
    private dataAdvisoryService: ManageAdvisoryService,
  ) { }

  ngOnInit(): void {
    this.Advisorys=[]
    this.ShowSpinner=true
    this.dataAdvisoryService.GetAllCourse().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Advisorys=res
      }
    )
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }
}
