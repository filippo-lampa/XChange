import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  messagesChannel: any;

  constructor() {
  }

  generateChannelName(senderId: string, receiverId: string){
    var sum = 0;
    var parsedSendChar = 0;
    var parsedRecChar = 0;
    for(var i=0; i<24; i++){ //24 hex characters is MongoDB's standard ObjectID's length
      parsedSendChar = parseInt(senderId.charAt(i));
      parsedRecChar = parseInt(receiverId.charAt(i));
      sum+= (isNaN(parsedSendChar) ? senderId.charAt(i).charCodeAt(0) : parsedSendChar);
      sum+= (isNaN(parsedRecChar) ? receiverId.charAt(i).charCodeAt(0) : parsedRecChar);
    }
    return sum;
  }

  initializePusher(senderId: string, receiverId: string): void {
    this.pusher = new Pusher(environment.pusher.key, {cluster: 'eu', authEndpoint: 'http://localhost:3000/api/pusher/auth'});
    this.messagesChannel = this.pusher.subscribe('private-' + this.generateChannelName(senderId, receiverId));
  }
}
