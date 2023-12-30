import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, NgFor, CommonModule, MatPaginatorModule],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'destination', 'origin', 'departure', 'price', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Flight, MatPaginator>;

  constructor(private flightService: FlightService){}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        // Handle successful response here
        this.dataSource = new MatTableDataSource<Flight>(flights);
        
      },
      error: (error) => {
        // Handle error here
        console.error('Cannot fetch data ', error);
      }}
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
