import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaneService } from '../plane.service';
import { Plane } from '../plane';
import { Router } from 'express';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [
    CommonModule,
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

  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent {

  // ng mat fields
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  //  custom fields 
  id!: number;
  planes!: Plane[];

  editFlightDetailsForm!: FormGroup
  origin:  FormControl = new FormControl('');
  plane: FormControl = new FormControl('');
  departureTime: FormControl = new FormControl('');  
  destination: FormControl = new FormControl('');
  delayInMins: FormControl = new FormControl('');;
  price:  FormControl = new FormControl('');
  seatsCount: FormControl = new FormControl('');

  constructor(private _formBuilder: FormBuilder,
          private route: ActivatedRoute,
          private flightService: FlightService,
          private matSnackBar: MatSnackBar,
          private planeService: PlaneService) {
      
      this.planeService.getAllPlanes().subscribe({
        next: (planes) => {
          this.planes = planes;
          console.log("planes ", planes);
        },
        error(err) {
          console.error(err);
        },
      })

      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];

          this.editFlightDetailsForm = new FormGroup({
            origin: this.origin,
            plane: this.plane,
            departureTime: this.departureTime,
            destination: this.destination,
            delayInMins: this.delayInMins,
            seatsCount: this.seatsCount,
            price: this.price
          })
        }
      )
  }


    editFlight() {
      const FlightEditData: Flight = {
        "origin": this.editFlightDetailsForm.get('origin')?.value,
        "plane": this.editFlightDetailsForm.get('plane')?.value,
        "destination": this.editFlightDetailsForm.get('destination')?.value,
        "departureTime": this.editFlightDetailsForm.get('departureTime')?.value,
        "delayInMins": this.editFlightDetailsForm.get('delayInMins')?.value,
        "price": this.editFlightDetailsForm.get('price')?.value,
        "seatsCount": this.editFlightDetailsForm.get('seatsCount')?.value
      }

      console.log("edit: ", FlightEditData);

      this.flightService.updateFlight(this.id ,FlightEditData).subscribe({
        next: (response: Flight) => {
          // Handle successful response here
          console.log('Flight saved successfully', response);
          console.log('Flight saved successfully', this.id);

          this.editFlightDetailsForm.reset({
            origin: "",
            plane: "",
            departureTime: "",
            destination: "",
            delayInMins: "",
            seatsCount: "",
            price: ""
          });

          this.matSnackBar.open("Flight added successfully", "OK");
        },
        error: (error) => {
          // Handle error here
          console.error('Error saving flight', error);
        }
    });
      console.log(FlightEditData)
    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}
