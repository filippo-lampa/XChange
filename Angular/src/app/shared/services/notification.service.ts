
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Notification } from "../models/notification.model";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable()
export class NotificationService {

    readonly baseURL = 'https://xchangenet.herokuapp.com/api';

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: PushSubscription, userId: string) {
        return this.http.post(this.baseURL + '/notifications/' + `${userId}`, sub);
    }

    send(senderUserId: string, receiverUserId: string, notificationPayload?: any) { console.log(notificationPayload)
        return this.http.post(this.baseURL + '/notificationcenter/'+ `${senderUserId}` + "/" + `${receiverUserId}`, notificationPayload).subscribe(val =>console.log("notification sent"));
    }

    getUserNotifications(userId: string){
      return this.http.get(this.baseURL + '/notificationcenter/' + `${userId}`);
    }

    getNotification(notificationId: string){
      return this.http.get(this.baseURL + '/notificationcenter/notification/' + `${notificationId}`);
    }

    setNotificationRead(notification: Notification){
      return this.http.put(this.baseURL + '/notificationcenter/', notification);
    }

}
