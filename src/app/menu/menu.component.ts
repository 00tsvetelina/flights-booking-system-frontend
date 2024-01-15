import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private auth: AuthService){}

  getRoles(): boolean {
    let roleAdmin: string[] = ['admin'];

    if(roleAdmin[0] === this.auth.roles[0]) {
      return true;
    } 
      return false;
  }

  authenticated(): boolean { 
    return this.auth.authenticated; 
  }
  
}
