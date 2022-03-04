
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Notification } from "./notification.model";


@Injectable()
export class NewsletterService {

    readonly baseURL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: PushSubscription, userId: String) {
        return this.http.post(this.baseURL + '/notifications/' + `${userId}`, sub);
    }

    send(senderUserId: String, receiverUserId: String) {
        return this.http.post(this.baseURL + '/notificationcenter/'+ `${senderUserId}` + "/" + `${receiverUserId}`, null).subscribe(val =>console.log("notification sent"));
    }

    getUserNotifications(userId: string){
      return this.http.get(this.baseURL + '/notificationcenter/' + `${userId}`);

    }
}
