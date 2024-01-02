import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Ticket } from '../models/ticket';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  

  tickets: Ticket[] = this.cartService.getTickets();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log('tickets: ', this.tickets);
  }

  onReturn(ticketIndex: number): void{
    this.cartService.deleteTicket(ticketIndex);

    this.tickets = this.cartService.getTickets();
  }

}

//TODO
// add snackbar
// add promo code func
// add total price 
// get ticket count func for ticket total count