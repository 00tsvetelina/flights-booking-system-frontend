import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})

export class DeleteDialogComponent {

  constructor(
    private dialog: MatDialog,
    private flightService: FlightService,
    @Inject(MAT_DIALOG_DATA) private flightData: any 
  ){}

  onDelete(){
    this.flightService.deleteFlight(this.flightData.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        console.error("Cannot delete flight with id: ", this.flightData.id)
      }
    })
  }

  onClose(){
    this.dialog.closeAll();
  }
}
