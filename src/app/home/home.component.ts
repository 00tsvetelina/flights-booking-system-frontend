import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { AddFlightComponent } from '../add-flight/add-flight.component';
import { RouterOutlet } from '@angular/router';
import { FlightListComponent } from '../flight-list/flight-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, AddFlightComponent, RouterOutlet, FlightListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
