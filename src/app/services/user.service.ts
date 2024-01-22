import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserInput } from '../models/user-input';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/api/admin/users/" + userId)
  }

  getUserByUsername(username: string): Observable<UserInput> {
    return this.httpClient.get<UserInput>("http://localhost:8080/api/admin/users/load?username=" + username)
  }

  authenticateUser(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>("http://localhost:8080/api/admin/users/login?username=" + username);
  }

  getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>("http://localhost:8080/api/admin/users")
  }
  
  saveUser(userData: UserInput): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/api/admin/users", userData);
  }

  enableUser(userId: number, userData: User): Observable<User> {
    return this.httpClient.patch<User>("http://localhost:8080/api/admin/users/enable/" + userId, userData);
 
  }

  disableUser(userId: number, userData: User): Observable<User> {
    return this.httpClient.patch<User>("http://localhost:8080/api/admin/users/disable/" + userId, userData);
  }

  deleteUser(userId: number): Observable<User> {
    return this.httpClient.delete<User>("http://localhost:8080/api/admin/users/" + userId);    
  }

}