import { Component, NgZone, OnInit } from '@angular/core';
import { SignalService } from 'src/app/services/signalR/signal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  AdvisoryHub!:any
  canSendMessage!: Boolean;
  constructor(
    private _signalRService: SignalService,
    private _ngZone: NgZone){ 
      this.subscribeToEvents();
      this.canSendMessage = _signalRService.connectionExists;
  }
  subscribeToEvents() {
    var self = this;

    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });
  }
  ngOnInit(): void {
  }
  alert(){
    alert("Chức Năng Đang Phát Triển")
  }
}
