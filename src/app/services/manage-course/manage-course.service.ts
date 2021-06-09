import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/classes/course.model';

@Injectable({
  providedIn: 'root'
})
export class ManageCourseService {
  BaseUrl="https://englishschool.azurewebsites.net/api/course/"
  constructor(private _http:HttpClient) { }

  GetAllCourse(){
    return this._http.get<Course[]>(this.BaseUrl+"all")
  }

  GetAllCourseByUserId(userId:any){
    return this._http.get<Course[]>(this.BaseUrl+"all/"+userId)
  }

  AddCourse(Question:any){
    return this._http.post<Course>(this.BaseUrl+"add", Question)
  }

  UpdateCourse(Question:any){
    return this._http.put<Course>(this.BaseUrl+"update", Question)
  }
}
