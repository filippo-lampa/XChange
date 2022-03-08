// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';
import { Notification } from '../shared/models/notification.model';
import { ExchangeService } from "../shared/services/exchange.service";

@Component({
  selector: 'app-exchange-received',
  templateUrl: './exchange-received.component.html',
  styleUrls: ['./exchange-received.component.css']
})
export class ExchangeReceivedComponent implements OnInit {

  notification!: Notification;
  isDataLoaded: boolean = false;

  constructor(private router: ActivatedRoute, private notificationService: NotificationService, private exchangeService: ExchangeService) {
    if(this.router.params)
      this.router.params.subscribe(params=>
        this.notificationService.getNotification(params['notificationId']).subscribe(data=>{this.notification = data as Notification; this.isDataLoaded = true;}));
   }

  ngOnInit(): void {
  }

  acceptExchange(){
 //   this.notificationService.sendExchangeResultNotification()
  //  this.exchangeService.sendExchangeResultNotification(true).subscribe(data=>console.log("exchange accepted"));
  }

  declineExchange(){
 //   this.exchangeService.sendExchangeResultNotification(false).subscribe(data=>console.log("exchange declined"));
  }
}
