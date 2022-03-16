import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/authData.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) { }

  postAuth(authData: AuthData): Observable<any> {
    return this.http.post(this.baseURL, authData);
  }

}
