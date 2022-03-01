import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  userId!: String;
  selectedUser!: User;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>this.userId = params['id']);
  }

  ngOnInit(): void {
     this.userService.getUser(this.userId).subscribe((data)=>{
      this.selectedUser = data as User;
     });
  }

  get userName() { return (this.selectedUser) ? this.selectedUser.name : null }

  get userSurname() { return (this.selectedUser) ? this.selectedUser.surname : null }


}
