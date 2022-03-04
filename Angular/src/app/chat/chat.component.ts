import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { TokenStorageService } from '../shared/token-storage.service';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Message } from '../shared/message.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  recipientUsername: String = 'recipientUsername';
  user: User = new User;
  username: String = 'username';
  message = '';
  messages: Message[] = [];

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute) {
    if(this.route.params){
      this.route.params.subscribe(params=> this.recipientUsername = params['userId']);
    }
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('0f35454c8019950992a7', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message',  (data: never) => {
      this.messages.push(data);
    });
  }

  submit(): void {console.log(this.tokenStorageService.getUserId());
    this.userService.getUser(this.tokenStorageService.getUserId()!).subscribe(user=>{this.user = user as User; this.username = this.user.username});
    this.http.post('http://localhost:8000/api/messages', {
      username: this.user.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }


}
