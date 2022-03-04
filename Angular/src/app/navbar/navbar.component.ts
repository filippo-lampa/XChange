import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { Notification } from '../shared/models/notification.model';
import { NotificationService } from '../shared/services/notification.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userNotificationList: Notification[] = [];
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private elementRef: ElementRef, private notificationService: NotificationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.getUserNotifications();
    }
  }

  ngAfterViewInit(){
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  }

  getToMessagePage(){
    this.router.navigate(['/messages/' + this.tokenStorageService.getUserId()]);
  }

  getUserNotifications(){  //get nel backend funziona e qua restituisce array vuoto??????
    this.notificationService.getUserNotifications(this.tokenStorageService.getUserId()!).subscribe(data =>{console.log(data); this.userNotificationList = data as Notification[]});
    this.userNotificationList.forEach(notification => {
      this.userService.getUser(notification.senderId).subscribe(data => notification.senderDetails = data as User);
    });
  }

}
