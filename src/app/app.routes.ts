import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';

export const routes: Routes = [
    {   path: '', component: HomeComponent,
        children: [
            { path: "flights", component: FlightListComponent },
            { path: "add-flight", component: AddFlightComponent}
            // { path: "planes", component: PlaneComponent },
            // { path: "users", component: UserComponent }
        ]
    },
    
];
