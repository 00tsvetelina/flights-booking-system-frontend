import { NgFor, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Plane } from '../../models/plane';
import { PromoService } from '../../services/promo.service';
import { DeletePromoComponent } from './delete-promo/delete-promo.component';
import { Promo } from '../../models/promo';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-promo-list',
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
  templateUrl: './promo-list.component.html',
  styleUrl: './promo-list.component.css'
})
export class PromoListComponent {

  displayedColumns: string[] = ['id', 'promoCode', 'percentOff', 'durationEnd', 'singleUse', 'tickets', 'btn'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Promo, MatPaginator>;
  ticketsList!: Ticket[];

  constructor(
    private promoService: PromoService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.promoService.getAllPromos().subscribe({
      next: (promos) => {
        // Handle successful response here
        this.dataSource = new MatTableDataSource<Promo>(promos);
      },
      error: (error) => {
        // Handle error here
        console.error('Cannot fetch data ', error);
      }}
    );
  }

  openDialog(id: number): void {
    console.log("id ", id)
    this.dialog.open(DeletePromoComponent, {
      width: '250px',
      data: {
        id: id
      }
    });
  }


}
