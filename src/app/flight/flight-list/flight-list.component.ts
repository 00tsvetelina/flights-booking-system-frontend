import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

import { CommonModule, NgFor } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { CartService } from '../../services/cart.service';
import { log } from 'console';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [MatTableModule,
      	    MatIconModule,
            MatButtonModule,
            RouterLink, NgFor,
            CommonModule,
            MatPaginatorModule,
            MatSnackBarModule,
            MatDialogModule,
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatDialogContent],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'destination', 'origin', 'departure', 'price', 'plane', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Flight, MatPaginator>;

  constructor(private flightService: FlightService,
                private dialog: MatDialog,
                private cartService: CartService,
                private auth: AuthService
                ){}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        console.log("flights: ", flights)
        // Handle successful response here
        this.dataSource = new MatTableDataSource<Flight>(flights);
      },
      error: (error) => {
        // Handle error here
        console.error('Cannot fetch data ', error);
      }}
    );
  }


  openDialog(id: number): void {
    console.log("id ", id)

    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: id
      }
    });
  }

  addToCart(flight: Flight){

    const TicketData: Ticket = {
      flight: flight,
      destination: flight.destination,
      departureTime: flight.departureTime,
      origin: flight.origin,
      ticketPrice: flight.price,
      promos: []
    }

    console.log("ticket data: ", TicketData)

    this.cartService.addToCart(TicketData);
  }

  getRoles(): boolean {
    if (!this.auth.authenticated) {
      return false;
    }
    let roleAdmin: string[] = ['admin'];

    if(roleAdmin[0] === this.auth.userMatch.roles[0]) {
      return true;
    } 
    
    return false;
  }

}
