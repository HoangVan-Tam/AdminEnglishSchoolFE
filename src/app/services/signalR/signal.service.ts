import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SignalService {
  public connectionEstablished: EventEmitter<Boolean>;
  public announcementReceived: EventEmitter<any>;
  public connectionExists: Boolean;
  private proxy: any;
  private connection: any;

  constructor() {
    // Constructor initialization  
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.announcementReceived = new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection  
    this.connection = $.hubConnection("https://englishschool.azurewebsites.net/signalr", { useDefaultPath: false });
    this.proxy = this.connection.createHubProxy('AdvisoryHub');
    // register on server events  
    this.registerOnServerEvents();
    // call the connecion start method to start the connection to send and receive events.  
    this.startConnection();
  }
  startConnection() {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }

  registerOnServerEvents() {
    this.proxy.on('Send', (announcement: any) => {
      this.announcementReceived.emit(announcement);
    });
  }
}