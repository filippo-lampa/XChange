import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private tokenTimer: any;

  constructor() { }

  public saveToken(token: string, expiresIn: number): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.setAuthTimer(expiresIn);
  }

  public saveUser(userId: string) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(userId));
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public logout() {
    window.sessionStorage.clear();
  }

  private setAuthTimer(expiresIn: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }
}
