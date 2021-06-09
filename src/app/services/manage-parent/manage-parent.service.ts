import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parent } from 'src/app/classes/parent.model';

@Injectable({
  providedIn: 'root'
})

export class ManageParentService {
  
  BaseUrl="https://englishschool.azurewebsites.net/api/parent/"
  constructor(private _http:HttpClient) { }

  GetAllParent(){
    return this._http.get<Parent[]>(this.BaseUrl+"all")
  }

  AddParent(Parent:any){
    return this._http.post<Parent>(this.BaseUrl+"add", Parent)
  }

  UpdateParent(Parent:any){
    return this._http.put<Parent>(this.BaseUrl+"update", Parent)
  }
  
  AddStudentOfParent(studentId:string, parentId:string){
    return this._http.post<any>(this.BaseUrl+"addStudentofparent"+parentId, studentId)
  }
}
