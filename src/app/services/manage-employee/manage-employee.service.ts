import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/classes/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeeService {

  BaseUrl="https://englishschool.azurewebsites.net/api/employee/"
  constructor(private _http:HttpClient) { }

  GetAllTeacher(){
    return this._http.get<Employee[]>(this.BaseUrl+"all")
  }

  AddTeacher(teacher:any){
    return this._http.post<Employee>(this.BaseUrl+"add", teacher)
  }

  UpdateTeacher(teacher:any){
    return this._http.patch<Employee>(this.BaseUrl+"update", teacher)
  }

  GetEmployee(userId:any){
    return this._http.get<Employee>(this.BaseUrl+userId)
  }

  GetAllTeacherByDepartmentId(departmentId:any){
    return this._http.get<Employee[]>(this.BaseUrl+"all/"+departmentId)
  }
}
