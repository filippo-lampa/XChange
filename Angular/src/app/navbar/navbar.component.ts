import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { Notification } from '../shared/models/notification.model';
import { NotificationService } from '../shared/services/notification.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  unreadNotifications: Notification[] = [];
  userNotificationList: Notification[] = [];
  isLoggedIn = false;
  userInfoLoaded = false;
  userId!: string;
  isAdmin = false;

  name!: string;
  surname!: string;
  username!: string;

  constructor(private tokenStorageService: TokenStorageService, private elementRef: ElementRef, private notificationService: NotificationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetVariables();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userId = this.tokenStorageService.getUserId();
      this.getUserNotifications();
      this.userService.getUser(this.userId).subscribe((data) => {
        var user = data as User;
        if (user.role == "ADMIN") {
          this.isAdmin = true;
        }
      });
    }
    setTimeout(() => { this.ngOnInit() }, 60000)
  }

  resetVariables() {
    this.unreadNotifications = [];
    this.userNotificationList = [];
    this.isLoggedIn = false;
    this.userInfoLoaded = false;
  }

  ngAfterViewInit() {
    var dropdownOptions = {
      'coverTrigger': false
    }
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, dropdownOptions);
  }

  getToMessagePage() {
    this.router.navigate(['/messages/' + this.tokenStorageService.getUserId()]);
  }

  getUserNotifications() {
    if (this.isLoggedIn) {
      this.notificationService.getUserNotifications(this.tokenStorageService.getUserId()!).subscribe(data => {
        this.userNotificationList = data as Notification[];
        this.userNotificationList.forEach(notification => {
          if (!notification.read)
            this.unreadNotifications.push(notification);
        });
      });
    }
  }

  setNotificationRead(notification: Notification) {
    if (this.isLoggedIn) {
      notification.read = true;
      this.notificationService.setNotificationRead(notification).subscribe(data => console.log("notification read"));
    }
  }
}
