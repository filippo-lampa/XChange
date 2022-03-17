import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/services/message.service';
import { MessageService } from '../../shared/services/message.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PusherService } from 'src/app/shared/services/pusher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Array<Message>;
  senderUsername!: string;
  receiverUsername!: string;
  senderUser!: User;
  receiverUser!: User;
  isLoggedIn: boolean = false;
  senderId: string = "ciao";
  receiverId: string = "ciao";
  channelName: string = "";
  isDataLoaded: boolean = false;

  constructor(private messageService: MessageService, private pusherService: PusherService, private userService: UserService, private tokenService: TokenStorageService, private route: ActivatedRoute) {
    if (this.tokenService.getToken()) {
        this.isLoggedIn = true;
        this.userService.getUser(this.tokenService.getUserId()!).subscribe(data=>{this.senderUser = data as User; this.senderUsername = this.senderUser.username});
    }
    this.messages = [];
  }

  ngOnInit() {
    if(this.isLoggedIn){
      this.messageService.messagesStream.subscribe(this.newMessageEventHandler.bind(this));
      this.route.params.subscribe(params=>{
      this.senderId = params['senderId'];
      this.receiverId = params['receiverId'];
      this.userService.getUser(this.receiverId).subscribe(data=>{this.receiverUser = data as User; this.receiverUsername = this.receiverUser.username});
      this.pusherService.initializePusher(this.senderId,this.receiverId);
      this.messageService.initialize();
      this.getMessageHistory(this.senderId,this.receiverId);
      this.isDataLoaded = true;
    });
    }
  }

  getMessageHistory(senderId: string, receiverId: string){
    this.pusherService.retrieveHistory(this.senderId,this.receiverId)?.subscribe(data=>{
      var dataArray = data as Message[];
      dataArray.forEach(entry => {
        var message : Message = {
          body: entry.body,
          senderId: entry.senderId
        }
        this.messages.push(message);
      });
    });
  }

  private newMessageEventHandler(event: Message): void {
    this.messages.push(event);
  }
}
