import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Notification } from '../shared/models/notification.model';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {

  unreadNotifications: Notification[] = [];
  userNotificationList: Notification[] = [];
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.resetVariables();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.getUserNotifications();
    }
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

  resetVariables() {
    this.unreadNotifications = [];
    this.userNotificationList = [];
    this.isLoggedIn = false;
  }

}
