
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Notification } from "../models/notification.model";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {

    readonly baseURL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: PushSubscription, userId: string) { console.log("asking for")
        return this.http.post(this.baseURL + '/notifications/' + `${userId}`, sub);
    }

    send(senderUserId: string, receiverUserId: string) {
        return this.http.post(this.baseURL + '/notificationcenter/'+ `${senderUserId}` + "/" + `${receiverUserId}`, null).subscribe(val =>console.log("notification sent"));
    }

    getUserNotifications(userId: string){
      return this.http.get(this.baseURL + '/notificationcenter/' + `${userId}`);
    }

    setNotificationRead(notification: Notification){
      return this.http.put(this.baseURL + '/notificationcenter/', notification);
    }
}
