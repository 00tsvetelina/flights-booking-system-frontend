import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

    // TODO
  private baseUrl: string = "http://localhost:8080/api/admin/tickets/";

  constructor(private httpClient: HttpClient) {}

  // get ticket by ticketId
  getTicketById(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId)
  }

  // get all tickets
  getAllTickets(): Observable<Array<Ticket>> {
    return this.httpClient.get<Array<Ticket>>("http://localhost:8080/api/admin/tickets")
  }
  
  // save ticket
  saveTicket (ticketData: Ticket): Observable<Ticket> {
    return this.httpClient.post<Ticket>("http://localhost:8080/api/admin/tickets", ticketData);
  }

  // edit ticket
  updateTicket (ticketId: number, ticketData: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId, ticketData);
  }

  // delete ticket
  deleteTicket (ticketId: number): Observable<Ticket> {
    return this.httpClient.delete<Ticket>("http://localhost:8080/api/admin/tickets/" + ticketId);    
  }

}