import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from 'src/app/classes/question.model';

@Injectable({
  providedIn: 'root',
})
export class ManageQuestionService {
  BaseUrl="https://englishschool.azurewebsites.net/api/question/"
  constructor(private _http:HttpClient) { }

  GetAllQuestion(){
    return this._http.get<Question[]>(this.BaseUrl+"all")
  }

  AddQuestion(Question:any){
    return this._http.post<Question>(this.BaseUrl+"add", Question)
  }

  UpdateQuestion(Question:any){
    return this._http.put<Question>(this.BaseUrl+"update", Question)
  }
}
