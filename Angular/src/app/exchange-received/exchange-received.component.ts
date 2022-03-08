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
    var notificationPayload = {
      "notification": {
          "title": "Exchange offer accepted",
          "body": "Exchange offer for product " + this.notification.requestedProduct.name + " accepted by " + this.notification.receiverUsername,
          "icon": "assets/main-page-logo-small-hat.png",
          "vibrate": [100, 50, 100],
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          },
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }],
          "exchangeResult": "true",
          "givenProductId": this.notification.requestedProduct._id,
          "acceptedProducts": this.exchangeService.offeredProducts
      }
    };
 //   this.exchangeService.saveExchange(notificationPayload);
    this.notificationService.send(this.notification.receiver,this.notification.sender,notificationPayload);
  }

  refuseExchange(){
    var notificationPayload = {
      "notification": {
          "title": "Exchange offer refused",
          "body": "Exchange offer for product " + this.notification.requestedProduct.name + " refused by " + this.notification.receiverUsername,
          "icon": "assets/main-page-logo-small-hat.png",
          "vibrate": [100, 50, 100],
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          },
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }],
          "exchangeResult": "false"
      }
    };
 //   this.exchangeService.saveExchange(notificationPayload);
    this.notificationService.send(this.notification.receiver,this.notification.sender,notificationPayload);
  }


}
