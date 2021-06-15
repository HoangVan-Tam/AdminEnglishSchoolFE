import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/classes/course.model';
import { CourseDetail } from 'src/app/classes/coursedetail.model';
import { ScoreResult } from 'src/app/classes/scoreresult.model';
import { Student } from 'src/app/classes/student.model';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  BaseUrl="https://englishschool.azurewebsites.net/api/"
  constructor(private _http:HttpClient) { }

  GetStudent(id:string){
    return this._http.get<Student>(this.BaseUrl+'student/'+id)
  }

  GetAllCourseOfStudent(id:string){
    return this._http.get<CourseDetail[]>(this.BaseUrl+'classDetail/all/'+id)
  }

  GetAllScoreOfStudent(id:number){
    return this._http.get<ScoreResult[]>(this.BaseUrl+"scoreresult/all/"+id)
  }

  registerCourse(course:any){
    return this._http.post(this.BaseUrl+"student/RegisterCourse", course)
  }

  TeacherRegisterCourse(course:any){
    return this._http.post(this.BaseUrl+"employee/RegisterCourse", course)
  }
}
