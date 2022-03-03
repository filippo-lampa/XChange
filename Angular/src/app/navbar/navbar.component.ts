import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { Notification } from '../shared/notification.model';
import { NewsletterService } from '../shared/newsletter.service';
import { Globals } from '../shared/globals';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userNotificationList: Notification[] = [];
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private elementRef: ElementRef, private notificationService: NewsletterService, private userService: UserService) { }

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

  getUserNotifications(){
    this.notificationService.getUserNotifications(Globals.loggedUserDetails._id!).subscribe(data => this.userNotificationList = data as Notification[]);
    this.userNotificationList.forEach(notification => {
      this.userService.getUser(notification.senderId).subscribe(data => notification.senderDetails = data as User);
    });
  }

}
