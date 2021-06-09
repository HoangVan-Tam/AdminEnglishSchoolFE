import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'src/app/classes/student.model';

@Injectable({
  providedIn: 'root'
})
export class ManageStudentService{

  BaseUrl="https://englishschool.azurewebsites.net/api/student/"
  constructor(private _http:HttpClient) { }

  GetAllStudent(){
    return this._http.get<Student[]>(this.BaseUrl+"all")
  }

  AddStudent(student:any){
    return this._http.post<Student>(this.BaseUrl+"add", student)
  }

  UpdateStudent(student:any){
    return this._http.patch<Student>(this.BaseUrl+"update", student)
  }
}
