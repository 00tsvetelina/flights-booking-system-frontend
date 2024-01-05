import { Component, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartService } from '../services/cart.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Ticket } from '../models/ticket';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Promo } from '../models/promo';
import { PromoService } from '../services/promo.service';
import { error, log } from 'console';
import { FormBuilder, FormControl, FormsModule, NgForm } from '@angular/forms';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, DatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DatePipe]
})

export class CartComponent implements OnInit {

  tickets: Ticket[] = this.cartService.getTickets();
  
  promos: Promo[] = [];
  promoInputs: string[] = [];
  isPromoSubmitted: boolean[] = [];

  constructor(
    private cartService: CartService,
    private matSnackBar: MatSnackBar,
    private promoService: PromoService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private datePipe: DatePipe) {

      this.promoService.getAllPromos().subscribe({
        next: (promos) => {
          console.log('promos ', promos);
          this.promos = promos;
        },
        error: (error) => {
          console.error('Cannot fetch data ', error);
        }
      })
  }

  ngOnInit() {
    console.log('tickets: ', this.tickets);
  }

  onReturn(ticketIndex: number): void{
    this.cartService.deleteTicket(ticketIndex);
    this.tickets = this.cartService.getTickets();
    this.matSnackBar.open("Ticket returned successfully", "OK");
  }

  onGetPrice(): number {
    let totalPrice = this.tickets.reduce((totalPrice: number, ticket: Ticket) => totalPrice + ticket.ticketPrice, 0)
    return totalPrice;
  }

  // make code unique
  onEnterCode(index: number) {


    let promo: Promo = this.promos.find((promo: Promo) => promo.promoCode === this.promoInputs[index])!;

    
    if(!this.validatePromo(promo, index)){
      return;
    }

    let ticketPrice: number = this.tickets[index].ticketPrice;
    let promoReducePercent: number = promo.percentOff;
    let finalPrice: number = ticketPrice - (ticketPrice * promoReducePercent/100);

    this.tickets[index].ticketPrice = finalPrice;
    this.isPromoSubmitted[index] = true;
    document.getElementById("price")!.style.color = '#ff4081';

    this.tickets[index].promos.push(promo);
    console.log("result ", this.tickets[index].promos)

  }

  onBook(): void {
    localStorage.setItem('tickets', JSON.stringify([]));
    this.tickets = [];
  }

  isPromoDisabled(index: number): boolean {
    return this.isPromoSubmitted[index];
  }

  validatePromo(promo: Promo, index: number): boolean {
    if(!promo) {
      this.matSnackBar.open("Invalid input", "OK");
      return false
    } 

    if(this.tickets[index].promos.includes(promo)) {
      this.matSnackBar.open("This code has already been used", "OK");
      return false
    } 

    if(promo.isUsed){
      this.matSnackBar.open("This code has already been used", "OK");
      return false
    }

    let currentDate: Date = new Date();
    let promoEndDate: Date = new Date(promo.durationEnd);

    if(promoEndDate < currentDate){
      this.matSnackBar.open("This code is expired", "OK");
      return false
    }

    if(promo.singleUse===true) {
      promo.isUsed = true;
    } 

    return true;
  }

}

