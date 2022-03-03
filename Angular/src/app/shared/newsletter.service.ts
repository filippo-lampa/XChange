
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class NewsletterService {

    readonly baseURL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub:PushSubscription) {
        return this.http.post(this.baseURL + '/notifications', sub);
    }

    send(receiverUserId: String) {
        return this.http.post(this.baseURL + '/notificationcenter/' + `${receiverUserId}`, null);
    }

}
