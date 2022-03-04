import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { PusherService } from './pusher.service';

export interface Message {
  text: string;
  user: string;
}

@Injectable()
export class MessageService {
  messagesStream = new ReplaySubject<Message>(1);

  constructor(
    private pusherService: PusherService
  ) {
    this.initialize();
  }

  initialize() {
    this.pusherService.messagesChannel.bind('client-new-message', (message: any) => {
      this.emitNewMessage(message);
    });
  }

  send(message: Message) {
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.emitNewMessage(message);
    console.log("message sent");
  }

  emitNewMessage(message: Message) {
    this.messagesStream.next(message);
    console.log("message emitted");
  }

}
