import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule, 
    RouterLink, 
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(
    private cartService: CartService,
    private auth: AuthService
  ){}

  getCartTicketsCount(): number {
    let ticketsList = this.cartService.getTickets();
    return ticketsList.length;
  }

  authenticated(): boolean { 
    return this.auth.getAuthenticated(); 
  }

  onLogout(): void {
    this.auth.logout();
  }

}
