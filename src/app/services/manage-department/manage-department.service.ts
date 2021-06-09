import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/classes/department.model';

@Injectable({
  providedIn: 'root'
})
export class ManageDepartmentService {

  BaseUrl="https://englishschool.azurewebsites.net/api/department/"
  constructor(private _http:HttpClient) { }

  GetAllDepartment(){
    return this._http.get<Department[]>(this.BaseUrl+"all")
  }

  AddDepartment(Question:any){
    return this._http.post<Department>(this.BaseUrl+"add", Question)
  }

  UpdateDepartment(Question:any){
    return this._http.put<Department>(this.BaseUrl+"update", Question)
  }
}
