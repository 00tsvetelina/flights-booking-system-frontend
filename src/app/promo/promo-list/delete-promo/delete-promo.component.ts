import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PromoService } from '../../../services/promo.service';

@Component({
  selector: 'app-delete-promo',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule
  ],
  templateUrl: './delete-promo.component.html'
})

export class DeletePromoComponent {

  constructor(
    private dialog: MatDialog,
    private promoService: PromoService,
    @Inject(MAT_DIALOG_DATA) private promoData: any 
  ){}

    onDelete(){
      this.promoService.deletePromo(this.promoData.id).subscribe({
        next: () => {
          this.promoData = this.promoService.getAllPromos().subscribe();
        },
        error: () => {
          console.error("Cannot delete flight with id: ", this.promoData.id);
      }
      })
    }
  
    onClose(){
      this.dialog.closeAll();
    }
}
