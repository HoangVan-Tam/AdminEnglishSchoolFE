import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruitment } from 'src/app/classes/recruitment.model';

@Injectable({
  providedIn: 'root'
})
export class ManageRecruitmentService {

  BaseUrl="https://englishschool.azurewebsites.net/api/recruitment/"
  constructor(private _http:HttpClient) { }

  GetAllrecruitment(){
    return this._http.get<Recruitment[]>(this.BaseUrl+"all")
  }

  AddRrecruitment(student:any){
    return this._http.post<Recruitment>(this.BaseUrl+"add", student)
  }

  UpdateRecruitment(student:any){
    return this._http.patch<Recruitment>(this.BaseUrl+"update", student)
  }
  DeleteRecruitment(id:number){
    return this._http.delete(this.BaseUrl+id)
  }
}
