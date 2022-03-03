import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './shared/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = "BOzdHgXy8Zfg_aMFp-HMpEKMPzd_uPYmcYBq9Y30itAIsyP6WVF3IQXAeK7GYrE4BhMtfUrWoMNqiLCgUyRj90c";

  constructor( private swPush: SwPush, private newsletterService: NewsletterService){}

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
}

  title = 'Angular';
}
