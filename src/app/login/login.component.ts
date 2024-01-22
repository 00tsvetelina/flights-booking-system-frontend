import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  credentials = {username: '', password: ''};
  error: boolean = false;

  constructor(
    private auth: AuthService, 
    private router: Router
  ){}

  login(): void{
    this.auth.authenticate(this.credentials);
    this.router.navigateByUrl('/');
    
    if (!this.auth.getAuthenticated()) {
      this.error = true;
    }
  }

}
