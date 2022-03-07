import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { TokenStorageService } from '../shared/services/token-storage.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  userId!: string;
  selectedUser!: User;
  loggedUserId: string = "";

  constructor(private userService: UserService, private route: ActivatedRoute, private tokenStorageService: TokenStorageService) {
    this.route.params.subscribe(params =>this.userId = params['id']);
  }

  ngOnInit(): void {
      if(this.tokenStorageService.getToken())
        this.loggedUserId = this.tokenStorageService.getUserId();
      this.userService.getUser(this.userId).subscribe((data)=>{
      this.selectedUser = data as User;
     });
  }

  get userName() { return (this.selectedUser) ? this.selectedUser.name : null }

  get userSurname() { return (this.selectedUser) ? this.selectedUser.surname : null }


}
