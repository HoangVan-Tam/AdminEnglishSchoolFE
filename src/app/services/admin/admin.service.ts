import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BaseUrl="https://englishschool.azurewebsites.net/api/"
  constructor(private _http:HttpClient) { }

  AdminLogin(id:any){
    return this._http.post<any>(this.BaseUrl+'auth/Admin/login',id)
  }

  ChangePassword(account:any){
    return this._http.post(this.BaseUrl+"auth/employee/changepassword",account)
  }
}
