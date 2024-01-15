import { Component, Optional } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../services/cart.service';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ){}

  getCartTicketsCount(): number {
    let ticketsList = this.cartService.getTickets();
    return ticketsList.length;
  }

  authenticated() { 
    
    return this.auth.authenticated; 
  }

  logout() {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.auth.authenticated = false;
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }


}
