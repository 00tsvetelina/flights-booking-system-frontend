import {Component, Input} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FlightDto } from '../flight-dto-post';
import { RouterLink } from '@angular/router';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   btn: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', btn: "Book Now"},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',btn: "Book Now"},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', btn: "Book Now"},
// ];
@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {
  @Input()
  flight!: FlightDto;

  displayedColumns: string[] = ['id', 'destination', 'departure', 'price', 'btn'];
  // dataSource = ELEMENT_DATA;

}
