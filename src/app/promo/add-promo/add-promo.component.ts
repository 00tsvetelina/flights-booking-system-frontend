import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { PromoService } from '../../services/promo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Promo } from '../../models/promo';
import { response } from 'express';

@Component({
  selector: 'app-add-promo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    RouterLink
  ],
  templateUrl: './add-promo.component.html',
  styleUrl: './add-promo.component.css'
})
export class AddPromoComponent {

  savePromoDetailsForm: FormGroup;
  
  promoCode:  FormControl = new FormControl('');
  percentOff: FormControl = new FormControl('');
  durationEnd: FormControl = new FormControl('');
  singleUse: FormControl = new FormControl('');

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private promoService: PromoService,
    private router: Router
  ){
   
      this.savePromoDetailsForm = new FormGroup({
        promoCode: this.promoCode,
        percentOff: this.percentOff,
        durationEnd: this.durationEnd,
        singleUse: this.singleUse
      })
    }

    savePromo(): void {
     const PromoData: Promo = {
      "promoCode": this.savePromoDetailsForm.get('promoCode')?.value,
      "percentOff": this.savePromoDetailsForm.get('percentOff')?.value,
      "durationEnd": this.savePromoDetailsForm.get('durationEnd')?.value,
      "singleUse": this.savePromoDetailsForm.get('singleUse')?.value
      }

      this.promoService.savePromo(PromoData).subscribe({
        next: () => {
          this.router.navigateByUrl("/promos");
          this.matSnackBar.open("Promo added successfully", "OK");
        },
        error: (error) => {
          console.error('Error saving promo', error);
        }
      })

    }

    getFloatLabelValue(): FloatLabelType {
      return this.floatLabelControl.value || 'auto';
    }
}
