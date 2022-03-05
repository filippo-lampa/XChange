import { Component } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {
  user!: string;
  message!: string;
  userObject!: User;
  isLoggedIn: boolean = false;

  constructor(private messageService: MessageService, private userService: UserService, private tokenService: TokenStorageService) {
    if(this.tokenService.getToken()){
        this.isLoggedIn = true;console.log(this.tokenService.getUserId() + "nm")
        this.userService.getUser(this.tokenService.getUserId()!).subscribe(user=>{this.userObject = user as User; this.user = this.userObject.username});
    }
  }

  newMessage(text: string): void {
    this.messageService.send({text: text, user: this.user});
    this.message = '';
  }

}
