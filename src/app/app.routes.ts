import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddFlightComponent } from './flight/add-flight/add-flight.component';
import { EditFlightComponent } from './flight/edit-flight/edit-flight.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { AddPlaneComponent } from './plane/add-plane/add-plane.component';
import { EditPlaneComponent } from './plane/edit-plane/edit-plane.component';
import { PlaneListComponent } from './plane/plane-list/plane-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
    {   path: '', component: HomeComponent,
        children: [
            { path: "flights", component: FlightListComponent },
            { path: "add-flight", component: AddFlightComponent},
            { path: "edit-flight/:id", component: EditFlightComponent },
            { path: "planes", component: PlaneListComponent },
            { path: "add-plane", component: AddPlaneComponent },
            { path: "edit-plane/:id", component: EditPlaneComponent},
        ]
    },
    {path: 'tickets', component: TicketComponent},
    {path: 'cart', component: CartComponent}
    
];
