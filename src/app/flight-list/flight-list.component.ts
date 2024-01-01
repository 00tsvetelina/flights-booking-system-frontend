import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogConfig, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

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
export class FlightListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'destination', 'origin', 'departure', 'price', 'plane', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Flight, MatPaginator>;

  constructor(private flightService: FlightService,
                private dialog: MatDialog
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


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


}
