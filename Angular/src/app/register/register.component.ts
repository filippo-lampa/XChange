import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    name: null,
    surname: null,
    address: null,
    phone: null,
    email: null,
    password: null,
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    console.log("ao");
    const user: User = {
      username: this.form.username,
      name: this.form.name,
      surname: this.form.surname,
      address: this.form.address,
      phone: this.form.phone,
      email: this.form.email,
      password: this.form.password
    }

    this.userService.postUser(user).subscribe(
      data => {
        console.log("ok");
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

}
