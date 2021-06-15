
import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Advisory } from 'src/app/classes/advisory.model';
import { ManageAdvisoryService } from 'src/app/services/manage-advisory/manage-advisory.service';
import { SignalService } from 'src/app/services/signalR/signal.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
@Component({
  selector: 'app-manage-advisory',
  templateUrl: './manage-advisory.component.html',
  styleUrls: ['./manage-advisory.component.scss']
})
export class ManageAdvisoryComponent implements OnInit {
  titleOfPage='Quản Lý Đăng Ký Tư Vấn';
  search:any
  pageChanged:number=1
  maxSize: number = 7;
  directionLinks: boolean = true;
  autoHide: boolean = false;
  responsive: boolean = true;
  labels: any = {
      previousLabel: '',
      nextLabel: '',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  Advisorys:Advisory[]=[]
  ShowSpinner= true;
  AdvisoryHub!:any

  canSendMessage!: Boolean;


  constructor(
    private dialog:MatDialog,
    private dataAdvisoryService: ManageAdvisoryService,
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

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        alert("Có Đăng Tý Tư Vấn Mới")
        self.Advisorys.push(announcement);
      });
    });
  }

  ngOnInit(): void {
    this.Advisorys=[]
    this.ShowSpinner=true
    this.dataAdvisoryService.GetAllAdvisory().subscribe(
      res=>{
        this.ShowSpinner=false
        this.Advisorys=res
      }
    )
  }
  key:string='courseId'
  reverse:boolean=false
  sort(key:any){
    this.key=key
    this.reverse=!this.reverse
  }

  Click(advisory:Advisory){
    let dialogRef = this.dialog.open(ContactDialogComponent, {
      height: '400px',
      width: '600px',
      data:{advisory}
    });
    /*advisory.status="Đã liên lạc"
    this.dataAdvisoryService.UpdateAdvisory(advisory).subscribe(
      res=>{
        this.ShowSpinner=false
        this.Advisorys=res
      }
    )*/
  }  
}


