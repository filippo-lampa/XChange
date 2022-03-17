import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NgForm } from '@angular/forms';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";

@Component({
  selector: 'app-profiledit',
  templateUrl: './profiledit.component.html',
  styleUrls: ['./profiledit.component.css']
})
export class ProfileditComponent implements OnInit {

  selectedUser!: User;
  selectedUserId: string = "";
  dataLoaded = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params=>{this.selectedUserId = params['userId']});
  }

  ngOnInit(): void {
    this.userService.getUser(this.selectedUserId).subscribe(data=>{
      this.selectedUser = data as User;
      this.dataLoaded = true;
    });
  }

  onSubmit(userForm: NgForm){
      this.userService.putUser(userForm.value).subscribe((res)=>{
        M.toast({html: 'Updated successfully', classes: 'rounded'});
      })
  }

}

