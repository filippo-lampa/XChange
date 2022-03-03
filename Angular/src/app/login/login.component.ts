import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';
import { AuthService } from '../shared/auth.service';
import { AuthData } from '../shared/authData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  }

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private router: Router) { }

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
        this.isLoggedIn = true;
        this.tokenStorageService.saveToken(data.token, data.expiresIn);
        this.tokenStorageService.saveUser(data.userId);
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
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
