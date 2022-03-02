
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class NewsletterService {

    readonly baseURL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub:any) {
        return this.http.post(this.baseURL + '/notifications', sub);
    }

    send() {
        return this.http.post(this.baseURL + '/newsletter', null);
    }

}
