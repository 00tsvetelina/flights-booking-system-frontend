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

import { RouterLink } from '@angular/router';
import { Plane } from '../../models/plane';
import { PlaneService } from '../../services/plane.service';

@Component({
  selector: 'app-add-plane',
  standalone: true,
  imports: [FormsModule,
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
    RouterLink],
  templateUrl: './add-plane.component.html',
  styleUrl: './add-plane.component.css'
})
export class AddPlaneComponent {

  savePlaneDetailsForm: FormGroup;

  model: FormControl = new FormControl('');

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  constructor(private _formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private planeService: PlaneService) {


  this.savePlaneDetailsForm = new FormGroup({
    model: this.model
  })
  }

  saveFlight() {
    const PlaneData: Plane = {
      "model": this.savePlaneDetailsForm.get('model')?.value,
    }

    this.planeService.savePlane(PlaneData).subscribe({
      next: (response: Plane) => {
        // Handle successful response here
        console.log('Flight saved successfully', response);
        this.savePlaneDetailsForm.reset();
        this.matSnackBar.open("Flight added successfully", "OK");
      },
      error: (error) => {
        // Handle error here
        console.error('Error saving flight', error);
      }
  });
    console.log(PlaneData)
  }

getFloatLabelValue(): FloatLabelType {
  return this.floatLabelControl.value || 'auto';
}

}
