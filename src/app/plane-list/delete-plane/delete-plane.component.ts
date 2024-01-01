import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { PlaneService } from '../../plane.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-plane',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule],
  templateUrl: './delete-plane.component.html',
  styleUrl: './delete-plane.component.css'
})
export class DeletePlaneComponent {

  constructor(private dialog: MatDialog,
    private planeService: PlaneService,
    @Inject(MAT_DIALOG_DATA) private planeData: any ){}


  onDelete(){
    this.planeService.deletePlane(this.planeData.id).subscribe({
      next: (result) => {
        console.log("Deleted flight: ", result)
        window.location.reload();
      },
      error: (error) => {
        console.error("Cannot delete flight with id: ", this.planeData.id)
      }
    })
  }

  onClose(){
    this.dialog.closeAll();
  }

}
