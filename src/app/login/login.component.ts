import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
            MatCardModule,
            MatInputModule,
            MatButtonModule,
            CommonModule,
            RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  error: boolean = false;

  constructor(
    private auth: AuthService, 
    private http: HttpClient,
    private router: Router){}

    login(){
      this.auth.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/');
      })

      if (this.auth.authenticated === false) {
        this.error = true;
      }
    }

}
