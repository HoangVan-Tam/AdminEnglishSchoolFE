import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/classes/course.model';

@Injectable({
  providedIn: 'root'
})
export class ManageClassService {
  BaseUrl="https://englishschool.azurewebsites.net/api/class/"
  constructor(private _http:HttpClient) { }

  GetAllClass(){
    return this._http.get<any[]>(this.BaseUrl+"all")
  }
  GetAllClassByCourseIdAnDepartmentId(courseId:any, departmentId:any){
    return this._http.get<any[]>(this.BaseUrl+"all/course/"+courseId+"/department/"+departmentId)
  }

  GetAllCourseByDepartmentId(departmentId:any){
    return this._http.get<any[]>(this.BaseUrl+"all/"+departmentId)
  }

  AddClass(Question:any){
    return this._http.post<any>(this.BaseUrl+"add", Question)
  }

  UpdateCourse(Question:any){
    return this._http.put<any>(this.BaseUrl+"update", Question)
  }
}
