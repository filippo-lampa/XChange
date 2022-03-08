// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';
import { Notification } from '../shared/models/notification.model';

@Component({
  selector: 'app-exchange-received',
  templateUrl: './exchange-received.component.html',
  styleUrls: ['./exchange-received.component.css']
})
export class ExchangeReceivedComponent implements OnInit {

  notification!: Notification;
  isDataLoaded: boolean = false;

  constructor(private router: ActivatedRoute, private notificationService: NotificationService) {
    if(this.router.params)
      this.router.params.subscribe(params=>
        this.notificationService.getNotification(params['notificationId']).subscribe(data=>{this.notification = data as Notification; this.isDataLoaded = true;}));
   }

  ngOnInit(): void {
  }

}
