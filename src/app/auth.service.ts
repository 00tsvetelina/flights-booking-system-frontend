import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';
import { error } from 'node:console';
import { UserInput } from './models/user-input';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  headers: HttpHeaders = new HttpHeaders;
  authorization: string = '';
  roles: Array<string> = [];

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(credentials: any, callback: any) {
    console.log('get credentials: ', credentials)

    this.authorization = 'Basic ' + btoa(credentials.username + ':' + credentials.password)

    this.userService.getUserByUsername(credentials.username).subscribe({
      next:(user: UserInput) => {
        
        if(!user){          
          this.authenticated = false;
          return;
        }
        
        this.userService.getAllUsers().subscribe({
          next: (users: User[]) => {

            const userMatchRoles = users.filter(match => match.userName === user.userName)
                                  .map(userMatch => userMatch.roles);

            this.roles = userMatchRoles[0];

          }, error (error) {
            console.error("No match found.");
          }
        })
        
        this.authenticated = true;    
        return callback && callback();
      }, 
      error: (err) => {
        this.authenticated = false;
        console.warn(err);
      }}
    );
  }

}
