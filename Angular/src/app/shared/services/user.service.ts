import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser!: User;

  readonly baseURL = 'https://xchangenet.herokuapp.com/api/user';

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  getUser(userId: string) {
    return this.http.get(this.baseURL + `/${userId}`);
  }

  putUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseURL + `/${userId}`);
  }
}
