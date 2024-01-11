import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/user';

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
  getUserByUsername(username: string, headers: HttpHeaders): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/api/admin/users?username=" + username, {headers: headers})
  }

  // get all users
  getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>("http://localhost:8080/api/admin/users")
  }
  
  // save user
  saveUser(userData: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/api/admin/users", userData);
  }

  // edit user
  updateUser(userId: number, userData: User): Observable<User> {
    return this.httpClient.put<User>("http://localhost:8080/api/admin/users/" + userId, userData);
  }

  // delete user
  deleteUser(userId: number): Observable<User> {
    return this.httpClient.delete<User>("http://localhost:8080/api/admin/users/" + userId);    
  }

}