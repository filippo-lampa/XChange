import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { AuthService } from '../shared/services/auth.service';
import { AuthData } from '../shared/models/authData.model';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';
import { SwPush } from '@angular/service-worker';

// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, NotificationService]
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  }

  isLoggedIn = false;

  userId: string = "";

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private router: Router, private userService: UserService, private swPush: SwPush, private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onLogin(): void {
    const authData: AuthData = {
      email: this.form.email,
      password: this.form.password
    };
    this.authService.postAuth(authData).subscribe(
      data => {
        this.userId = data.userId;
        this.isLoggedIn = true;
        this.saveTokenAndUser(data)
          .then(() => this.router.navigate(['']))
          .then(() => this.reloadPage())
      },
      err => {
        M.toast({ html: 'Invalid email or password', classes: 'rounded red toast-container' });
        console.log(err.error.message);
        this.isLoggedIn = false;
      }
    )
  }

  saveTokenAndUser(data: any) {
    var promise = new Promise<void>((resolve, reject) => {
      this.tokenStorageService.saveToken(data.token, data.expiresIn);
      this.tokenStorageService.saveUser(data.userId);
      resolve();
    });
    return promise;
  }

  onLogout(): void {
    this.tokenStorageService.logout();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }

}
