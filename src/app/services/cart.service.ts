import { Injectable } from "@angular/core";
import { Ticket } from "../models/ticket";

@Injectable({
    providedIn: 'root'
  })

export class CartService {

    addToCart(ticket: Ticket): void {
        let tickets = this.getTickets();
        tickets.push(ticket);

        console.log("all: ", tickets);

        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    getTickets(): Ticket[] {
        let tickets: string | null = localStorage.getItem('tickets');
        if (tickets) {
            return JSON.parse(tickets);
        } 
        return [];
    }

    deleteTicket(ticketIndex: number): void {
        let tickets = this.getTickets();
        tickets.splice(ticketIndex, 1);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

}