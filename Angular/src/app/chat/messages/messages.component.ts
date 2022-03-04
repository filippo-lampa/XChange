import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/services/message.service';
import { MessageService } from '../../shared/services/message.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Array<Message>;
  senderUsername!: string;
  senderUser!: User;
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {
    this.messages = [];
    this.userService.getUser(this.tokenService.getUserId()!).subscribe(data=>{this.senderUser = data as User; this.senderUsername = this.senderUser.username});
  }

  ngOnInit() {
    this.messageService.messagesStream
      .subscribe(this.newMessageEventHandler.bind(this));
  }

  private newMessageEventHandler(event: Message): void {
    this.messages.push(event);
  }
}
