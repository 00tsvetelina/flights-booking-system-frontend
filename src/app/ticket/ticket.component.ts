import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    DatePipe,
    MatSnackBarModule
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {

  tickets: Ticket[] = [];
  user = this.auth.userMatch;
  
  constructor(
    private ticketService: TicketService,
    private auth: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(){
    this.ticketService.getAllTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets.filter(match => match.user?.id === this.user.id);
      }
    })
  }

  OnCheckout(ticketId: number): void {
    this.ticketService.deleteTicket(ticketId).subscribe({
      next: () =>{
        this.router.navigateByUrl("/flights");
        this.matSnackBar.open("Checkout was successful! Enjoy your flight!", "Thanks!");
      }, error: (error) => {
        console.error('Error deleting ticket', error);
      }
    })
  }
}
