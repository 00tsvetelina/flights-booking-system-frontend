import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserInput } from '../models/user-input';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  // get user by userId
  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/api/admin/users/" + userId)
  }

  // get user by username
  getUserByUsername(username: string): Observable<UserInput> {
    return this.httpClient.get<UserInput>("http://localhost:8080/api/admin/users/load?username=" + username)
  }

  // get user by username
  authenticateUser(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>("http://localhost:8080/api/admin/users/login?username=" + username);
  }

  // get all users
  getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>("http://localhost:8080/api/admin/users")
  }
  
  // save user
  saveUser(userData: UserInput): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/api/admin/users", userData);
  }

  // edit user
  enableUser(userId: number, userData: User): Observable<User> {
    return this.httpClient.patch<User>("http://localhost:8080/api/admin/users/enable/" + userId, userData);
 
  }
  // edit user
  disableUser(userId: number, userData: User): Observable<User> {
    return this.httpClient.patch<User>("http://localhost:8080/api/admin/users/disable/" + userId, userData);
  }

  // delete user
  deleteUser(userId: number): Observable<User> {
    return this.httpClient.delete<User>("http://localhost:8080/api/admin/users/" + userId);    
  }

}