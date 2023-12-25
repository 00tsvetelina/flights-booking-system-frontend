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
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { FlightDto } from '../flight-dto';
import { log } from 'console';

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
    MatButtonModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {

  saveFlightDetailsForm: FormGroup;
  // flightId: number = 1;
  // plane: Object = {};
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

    //         this.flightId = this.activatedRoute.snapshot.params['flightId'];
    //         this.flightService.getFlightById(this.flightId).subscribe(data=>{
    //         this.plane = data.plane;
            
    // })
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
      const FlightDtoData: FlightDto = {
        // "id": this.flightId,
        // "plane": this.plane,
        "origin": this.origin.get('origin')?.value,
        "destination": this.destination.get('destination')?.value,
        "departureTime": this.departureTime.get('arrivalTime')?.value,
        "arrivalTime": this.arrivalTime.get('arrivalTime')?.value,
        "delayInMins": this.delayInMins.get('delayInMins')?.value,
        "price": this.price.get('price')?.value,
        "seatsCount": this.seatsCount.get('seatsCount')?.value
      }

      this.flightService.saveFlight(FlightDtoData).subscribe(data=>{
        console.log("Saved successfully");
      })
    }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}
