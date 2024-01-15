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
import {  Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight.service';
import { Plane } from '../../models/plane';
import { PlaneService } from '../../services/plane.service';

@Component({
  selector: 'app-add-flight',
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
    CommonModule],

  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {

  saveFlightDetailsForm: FormGroup;

  origin: FormControl = new FormControl('');
  plane: FormControl = new FormControl('');
  departureTime: FormControl = new FormControl('');  
  destination: FormControl = new FormControl('');
  delayInMins: FormControl = new FormControl('');;
  price: FormControl = new FormControl('');
  seatsCount: FormControl = new FormControl('');


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  planes!: Plane[];

  constructor(
    private _formBuilder: FormBuilder,
    private flightService: FlightService,
    private matSnackBar: MatSnackBar,
    private planeService: PlaneService,
    private router: Router
    ){

      this.planeService.getAllPlanes().subscribe({
        next: (planes) => {
          this.planes = planes;
          console.log("planes ", planes);
        },
        error(err) {
          console.error(err);
        },
      })

      this.saveFlightDetailsForm = new FormGroup({
        origin: this.origin,
        plane: this.plane,
        departureTime: this.departureTime,
        destination: this.destination,
        delayInMins: this.delayInMins,
        seatsCount: this.seatsCount,
        price: this.price
      })
  }

    saveFlight() {
      const FlightData: Flight = {
        "origin": this.saveFlightDetailsForm.get('origin')?.value,
        "plane": this.saveFlightDetailsForm.get('plane')?.value,
        "destination": this.saveFlightDetailsForm.get('destination')?.value,
        "departureTime": this.saveFlightDetailsForm.get('departureTime')?.value,
        "delayInMins": this.saveFlightDetailsForm.get('delayInMins')?.value,
        "price": this.saveFlightDetailsForm.get('price')?.value,
        "seatsCount": this.saveFlightDetailsForm.get('seatsCount')?.value
      }

      this.flightService.saveFlight(FlightData).subscribe({
        next: (response: Flight) => {
          // Handle successful response here
          console.log('Flight saved successfully', response);
          this.router.navigateByUrl('/flights');
          this.matSnackBar.open("Flight added successfully", "OK");
        },
        error: (error) => {
          // Handle error here
          console.error('Error saving flight', error);
        }
    });
      console.log(FlightData)
    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}
