import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  constructor(private httpClient: HttpClient) {}

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId)
  }

  getAllTickets(): Observable<Array<Ticket>> {
    return this.httpClient.get<Array<Ticket>>("http://localhost:8080/api/admin/tickets")
  }
  
  saveTicket (ticketData: Ticket): Observable<Ticket> {
    return this.httpClient.post<Ticket>("http://localhost:8080/api/admin/tickets", ticketData);
  }

  updateTicket (ticketId: number, ticketData: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId, ticketData);
  }

  deleteTicket (ticketId: number): Observable<Ticket> {
    return this.httpClient.delete<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId);    
  }

}