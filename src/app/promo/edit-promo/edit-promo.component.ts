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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { PromoService } from '../../services/promo.service';
import { Promo } from '../../models/promo';

@Component({
  selector: 'app-edit-promo',
  standalone: true,
  imports: [CommonModule,
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
    RouterLink],
  templateUrl: './edit-promo.component.html',
  styleUrl: './edit-promo.component.css'
})
export class EditPromoComponent {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  editPromoDetailsForm!: FormGroup;
  
  promoCode:  FormControl = new FormControl('');
  percentOff: FormControl = new FormControl('');
  durationEnd: FormControl = new FormControl('');
  singleUse: FormControl = new FormControl('');

  id!: number;

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private promoService: PromoService) {

  this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];

      this.editPromoDetailsForm = new FormGroup({
        promoCode: this.promoCode,
        percentOff: this.percentOff,
        durationEnd: this.durationEnd,
        singleUse: this.singleUse
      })
    }
  )
  }

  editPromo() {
    const PromoEditData: Promo = {
      "promoCode": this.editPromoDetailsForm.get('promoCode')?.value,
      "percentOff": this.editPromoDetailsForm.get('percentOff')?.value,
      "durationEnd": this.editPromoDetailsForm.get('durationEnd')?.value,
      "singleUse": this.editPromoDetailsForm.get('singleUse')?.value
    }

    console.log("edit: ", PromoEditData);

    this.promoService.updatePromo(this.id ,PromoEditData).subscribe({
      next: (response: Promo) => {
        // Handle successful response here
        console.log('Promo saved successfully', response);
        console.log('Promo saved successfully', this.id);

        this.editPromoDetailsForm.reset({
          promoCode: "",
          percentOff: "",
          durationEnd: "",
          singleUse: ""
        });

        this.matSnackBar.open("Promo edited successfully", "OK");
      },
      error: (error) => {
        // Handle error here
        console.error('Error saving promo', error);
      }
  });
  }

getFloatLabelValue(): FloatLabelType {
  return this.floatLabelControl.value || 'auto';
}


}
