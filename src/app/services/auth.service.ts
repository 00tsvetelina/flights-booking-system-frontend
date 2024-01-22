import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserInput } from '../models/user-input';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;
  private authorization: string = '';
  private userMatch?: User;

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  getUserMatch(): User | undefined{
    return this.userMatch;
  }

  getAuthorization(): string {
    return this.authorization;
  } 

  getAuthenticated(): boolean {
    return this.authenticated;
  }

  logout(): void {
    this.authenticated = false;
    this.authorization = '';
    this.userMatch = undefined;

    this.router.navigateByUrl('/login');
  }

  authenticate(credentials: any): void {

    this.authorization = 'Basic ' + btoa(credentials.username + ':' + credentials.password)

    this.userService.getUserByUsername(credentials.username).subscribe({
      next:(user: UserInput) => {
        if(!user){          
          this.authenticated = false;
          return;
        }
        
        this.userService.getAllUsers().subscribe({
          next: (users: User[]) => {
            this.userMatch = users.filter(match => match.userName === user.userName)[0];
          }, 
          error (error) {
            console.error(error, "No match found.");
          }
        })
        
        this.authenticated = true;      
      }, 
      error: (err) => {
        this.authenticated = false;
        console.error(err);
      }}
    );
  }
}

