import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserInput } from '../models/user-input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  
  userDetails: FormGroup;
  fullName: FormControl = new FormControl('');
  username: FormControl =  new FormControl('');
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  passwordRepeat: FormControl = new FormControl('');
  errorMessage: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar  
  ){

    this.userDetails = new FormGroup({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat
    });
  }

  onSubmit(): void {

    const UserData: UserInput = {
      "firstAndLastNames": this.userDetails.get('fullName')?.value,
      "userName": this.userDetails.get('username')?.value,
      "email": this.userDetails.get('email')?.value,
      "password": this.userDetails.get('password')?.value,
      "isEnabled": true,
      "roles": ["user"]
    }

    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {

        let isUserValid = this.validateUserFields(UserData, users)

        if (isUserValid) {
          this.userService.saveUser(UserData).subscribe({
            next: () =>{
              this.router.navigateByUrl('/login');
              this.matSnackBar.open("Registration successful, please log in.", "OK");
            }
          })
        }
      },
      error: (err) => { 
        this.errorMessage = "Something went wrong. Please try again."
        console.error(err)
      },
    })
  }

  validateUserFields(userData: UserInput, users: User[]): boolean {

    let ifUsernameExists = users.some(user=> user.userName === userData.userName);
    let ifEmailExists = users.some(user=> user.email === userData.email);
    
    if(ifUsernameExists) {
     this.errorMessage = "Username already exists. Please try enter a different one."
     return false
    }

    if(ifEmailExists) {
      this.errorMessage = "Email already exists. Please try enter a different one."
      return false;
    }

    if(this.password.value !== this.passwordRepeat.value) {
      console.log(this.password, '!==', this.passwordRepeat);
      
      this.errorMessage = "Passwords do not match. Please enter same values."
      return false;
    }

    return true;
  }
}
