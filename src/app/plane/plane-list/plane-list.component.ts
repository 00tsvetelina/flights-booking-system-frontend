import { NgFor, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { DeletePlaneComponent } from './delete-plane/delete-plane.component';
import { Plane } from '../../models/plane';
import { PlaneService } from '../../services/plane.service';

@Component({
  selector: 'app-plane-list',
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
  templateUrl: './plane-list.component.html',
  styleUrl: './plane-list.component.css'
})
export class PlaneListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'model', 'flightsCount', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Plane, MatPaginator>;


  constructor(
    private planeService: PlaneService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.planeService.getAllPlanes().subscribe({
      next: (planes) => {
        // Handle successful response here
        this.dataSource = new MatTableDataSource<Plane>(planes);
      },
      error: (error) => {
        // Handle error here
        console.error('Cannot fetch data ', error);
      }}
    );
  }

  openDialog(id: number): void {
    console.log("id ", id)
    this.dialog.open(DeletePlaneComponent, {
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
