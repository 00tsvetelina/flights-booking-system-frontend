import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  headers: HttpHeaders = new HttpHeaders;
  authorization: string = '';

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(credentials: any, callback: any) {
    console.log('get credentials: ', credentials)

    this.authorization = 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    this.headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {}); 

    console.log('get headers: ', this.headers)


    this.userService.getUserByUsername(credentials.username, this.headers)
        .subscribe(response => {
          if(response['userName']) {
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }
      return callback && callback();
    });
  }

}
