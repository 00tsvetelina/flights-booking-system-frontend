import { Component } from '@angular/core';
import { FlightComponent } from '../flight/flight.component';
import { MenuComponent } from '../menu/menu.component';
import { AddFlightComponent } from '../add-flight/add-flight.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlightComponent, MenuComponent, AddFlightComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
