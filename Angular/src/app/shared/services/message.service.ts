import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { PusherService } from './pusher.service';
import { HttpClient } from '@angular/common/http';

export interface Message {
  body: string;
  senderId: string;
}

@Injectable()
export class MessageService {
  messagesStream = new ReplaySubject<Message>(1);
  readonly baseURL = 'http://localhost:3000/api/messages';

  constructor(
    private pusherService: PusherService,
    private http: HttpClient
  ) {
  }

  initialize() {
    this.pusherService.messagesChannel.bind('client-new-message', (message: any) => {
      this.emitNewMessage(message);
    });
  }

  send(message: Message, senderId: string, receiverId: string) {
    this.http.post(this.baseURL + `/${senderId}` + `/${receiverId}`, message).subscribe(data=>"saving chat message on db");
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.emitNewMessage(message);
  }

  emitNewMessage(message: Message) {
    this.messagesStream.next(message);
  }

  getSavedChatMessages(senderId: string, receiverId: string){
    return this.http.get(this.baseURL + '/messages' + `/${senderId}` + `/${receiverId}`);
  }
}
