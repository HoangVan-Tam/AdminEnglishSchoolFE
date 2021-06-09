import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/classes/event.model';

@Injectable({
  providedIn: 'root'
})
export class ManageEventService {

  BaseUrl="https://englishschool.azurewebsites.net/api/news/"
  constructor(private _http:HttpClient) { }

  GetEvent(id:string){
    return this._http.get<Event>(this.BaseUrl+id)
  }

  GetAllEvent(){
    return this._http.get<Event[]>(this.BaseUrl+'all')
  }

  UpdateEvent(event:Event){
    const td=new FormData
    td.append('bodyContent', event.bodyContent)
    td.append('headContent', event.headContent)
    td.append('title', event.title)
    td.append('image', event.image)
    td.append('id',event.id.toString())
    return this._http.put(this.BaseUrl+'update',td)
  }

  UpdateEventWithImage(event:Event, Image:File){
    const td=new FormData
    td.append('image', Image, Image.name)
    td.append('bodyContent', event.bodyContent)
    td.append('headContent', event.headContent)
    td.append('title', event.title)
    td.append('image', event.image)
    td.append('id',event.id.toString())
    return this._http.put(this.BaseUrl+'update',td)
  }

  AddEventWithImage(event:Event, Image:File){
    const td=new FormData
    td.append('image', Image, Image.name)
    td.append('bodyContent', event.bodyContent)
    td.append('headContent', event.headContent)
    td.append('title', event.title)
    td.append('postDateClient',event.postDateClient)
    return this._http.post(this.BaseUrl+'add',td)
  }
  AddEvent(event:Event){
    const td=new FormData
    td.append('bodyContent', event.bodyContent)
    td.append('headContent', event.headContent)
    td.append('title', event.title)
    td.append('postDateClient',event.postDateClient)
    return this._http.post(this.BaseUrl+'add',td)
  }
}
