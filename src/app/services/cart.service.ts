import { Injectable } from "@angular/core";
import { Ticket } from "../models/ticket";

@Injectable({
    providedIn: 'root'
})

export class CartService {

    addToCart(ticket: Ticket): void {

        if (typeof window !== 'undefined') {

            let tickets = this.getTickets();
            tickets.push(ticket);
            localStorage.setItem('tickets', JSON.stringify(tickets));          

          }
    }

    getTickets(): Ticket[] {
        if (typeof window !== 'undefined') {

            let tickets: string | null = localStorage.getItem('tickets');
            if (tickets) {
                return JSON.parse(tickets);
            }
                return []; 
        }
        return []; 
    }

    deleteTicket(ticketIndex: number): void {
        if (typeof window !== 'undefined') {

            let tickets = this.getTickets();
            tickets.splice(ticketIndex, 1);
            localStorage.setItem('tickets', JSON.stringify(tickets));  
          } 
    }
    
}