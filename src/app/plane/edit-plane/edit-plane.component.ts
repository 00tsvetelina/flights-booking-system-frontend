import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, FloatLabelType } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { Plane } from '../../models/plane';
import { PlaneService } from '../../services/plane.service';

@Component({
  selector: 'app-edit-plane',
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
  templateUrl: './edit-plane.component.html',
  styleUrl: './edit-plane.component.css'
})
export class EditPlaneComponent {

   // ng mat fields
   hideRequiredControl = new FormControl(false);
   floatLabelControl = new FormControl('auto' as FloatLabelType);
   
   options = this._formBuilder.group({
     hideRequired: this.hideRequiredControl,
     floatLabel: this.floatLabelControl,
   });
 
   //  custom fields 
   id!: number;
   editPlaneDetailsForm!: FormGroup;
   model: FormControl = new FormControl('');
 
 
   constructor(private _formBuilder: FormBuilder,
           private route: ActivatedRoute,
           private planeService: PlaneService,
           private matSnackBar: MatSnackBar) {
       
 
       this.route.params.subscribe(
         (params: Params) => {
           this.id = +params['id'];
           console.log(this.id, " id!")
 
           this.editPlaneDetailsForm = new FormGroup({
             model: this.model
           })
         }
       )
   }
 
 
     editPlane() {
       const PlaneEditData: Plane = {
        "model": this.editPlaneDetailsForm.get('model')?.value
       }
 
 
       this.planeService.updatePlane(this.id, PlaneEditData).subscribe({
         next: (response: Plane) => {
           // Handle successful response here
           console.log('Plane saved successfully', response);
           console.log('Plane saved successfully', this.id);
 
           this.editPlaneDetailsForm.reset({
             model: ""
           });
 
           this.matSnackBar.open("Plane added successfully", "OK");
         },
         error: (error) => {
           // Handle error here
           console.error('Error saving flight', error);
         }
     });
     }
 
   getFloatLabelValue(): FloatLabelType {
     return this.floatLabelControl.value || 'auto';
   }
}
