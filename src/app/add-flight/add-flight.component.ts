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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlightService } from '../flight.service';
import { FlightDtoPost } from '../flight-dto-post';

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
    RouterLink],

  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {

  saveFlightDetailsForm: FormGroup;
  origin:  FormControl = new FormControl('');
  departureTime: FormControl = new FormControl('');  
  arrivalTime:  FormControl = new FormControl('');  
  destination: FormControl = new FormControl('');
  delayInMins: FormControl = new FormControl('');;
  price:  FormControl = new FormControl('');
  seatsCount: FormControl = new FormControl();;


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder,
          private activatedRoute: ActivatedRoute,
          private flightService: FlightService) {

      this.saveFlightDetailsForm = new FormGroup({
        origin: this.origin,
        departureTime: this.departureTime,
        destination: this.destination,
        arrivalTime: this.arrivalTime,
        delayInMins: this.delayInMins,
        seatsCount: this.seatsCount,
        price: this.price
      })
  }

    saveFlight() {
      const FlightDtoData: FlightDtoPost = {
        "origin": this.saveFlightDetailsForm.get('origin')?.value,
        "destination": this.saveFlightDetailsForm.get('destination')?.value,
        "departureTime": this.saveFlightDetailsForm.get('arrivalTime')?.value,
        "arrivalTime": this.saveFlightDetailsForm.get('arrivalTime')?.value,
        "delayInMins": this.saveFlightDetailsForm.get('delayInMins')?.value,
        "price": this.saveFlightDetailsForm.get('price')?.value,
        "seatsCount": this.saveFlightDetailsForm.get('seatsCount')?.value
      }

      this.flightService.saveFlight(FlightDtoData).subscribe(
        (response: FlightDtoPost) => {
          // Handle successful response here
          console.log('Flight saved successfully', response);
        },
        (error) => {
          // Handle error here
          console.error('Error saving flight', error);
        }
      );
      console.log(FlightDtoData)
    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}
