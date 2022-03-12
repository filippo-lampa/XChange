import { Component, Input } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { PusherService } from 'src/app/shared/services/pusher.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
})
export class NewMessageComponent {
  @Input()
  senderId: string = "";
  @Input()
  receiverId: string = "";
  user!: string;
  message!: string;
  userObject!: User;
  isLoggedIn: boolean = false;

  constructor(private messageService: MessageService, private pusherService: PusherService, private userService: UserService, private tokenService: TokenStorageService) {
    if(this.tokenService.getToken()){
        this.isLoggedIn = true;
        this.userService.getUser(this.tokenService.getUserId()!).subscribe(user=>{this.userObject = user as User; this.user = this.userObject.username});
    }
  }

  newMessage(text: string): void {
    this.messageService.send({body: text, senderId: this.senderId},this.senderId, this.receiverId);
    this.message = '';
  }

}
