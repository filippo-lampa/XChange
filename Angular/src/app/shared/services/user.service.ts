import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser!: User;

  readonly baseURL = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(this.baseURL, user);
  }

  getUserList(){
    return this.http.get(this.baseURL);
  }

  getUser(userId: String){
    return this.http.get(this.baseURL + `/${userId}`);
  }

  putUser(user: User){
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(userId: String){
    return this.http.delete(this.baseURL + `/${userId}`);
  }
}
