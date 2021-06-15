import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advisory } from 'src/app/classes/advisory.model';
import { Course } from 'src/app/classes/course.model';

@Injectable({
  providedIn: 'root'
})
export class ManageAdvisoryService {
  BaseUrl="https://englishschool.azurewebsites.net/api/advisory/"
  constructor(private _http:HttpClient) { }

  GetAllAdvisory(){
    return this._http.get<Advisory[]>(this.BaseUrl+"all")
  }

  UpdateAdvisory(advisory:any){
    return this._http.put<any>(this.BaseUrl+"update", advisory)
  }
}
