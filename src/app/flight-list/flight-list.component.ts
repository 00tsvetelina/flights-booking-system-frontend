import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FlightDtoGet } from '../flight-dto-get';
import { FlightService } from '../flight.service';
import { CommonModule, NgFor } from '@angular/common';
import { log } from 'console';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, NgFor, CommonModule, MatPaginatorModule],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent implements OnInit, AfterViewInit {

  
  @Input()
  flight!: FlightDtoGet;
  displayedColumns: string[] = ['id', 'destination', 'origin', 'departure', 'price', 'btn'];
  flights: Array<FlightDtoGet> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<FlightDtoGet>(this.flights);

  constructor(private flightService: FlightService){}

  
  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe(
      (response) => {
        // Handle successful response here
        this.flights = response;
        console.log('Data fetched successfully ', this.flights);
      },
      (error) => {
        // Handle error here
        console.error('Cannot fetch data ', error);
      }
    );}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;

    }

}
