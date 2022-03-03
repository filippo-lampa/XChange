import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';
import { AuthService } from '../shared/auth.service';
import { AuthData } from '../shared/authData.model';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { NewsletterService } from '../shared/newsletter.service';
import { SwPush } from '@angular/service-worker';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, NewsletterService]
})
export class LoginComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BOzdHgXy8Zfg_aMFp-HMpEKMPzd_uPYmcYBq9Y30itAIsyP6WVF3IQXAeK7GYrE4BhMtfUrWoMNqiLCgUyRj90c";

  form: any = {
    email: null,
    password: null
  }

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private router: Router, private userService: UserService, private swPush: SwPush, private newsletterService: NewsletterService ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onLogin(): void {
    const authData: AuthData = {
      email: this.form.email,
      password: this.form.password
    }
    this.authService.postAuth(authData).subscribe(
      data => {
        this.userService.getUser(data.userId).subscribe(user =>{
          Globals.setLoggedUser(user as User);
          this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
          })
          .then( sub => this.newsletterService.addPushSubscriber(sub, Globals.loggedUserDetails._id!).subscribe())
          .catch(err => console.error("Could not subscribe to notifications", err));
        });
        this.tokenStorageService.saveToken(data.token);
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      },
      err => {
        console.log(err.error.message);
        this.isLoggedIn = false;
      }
    )
  }


  onLogout(): void {
    this.tokenStorageService.logout();
    this.router.navigate(['/']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
