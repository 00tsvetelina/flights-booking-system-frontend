import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { HomeComponent } from './home/home.component';
import { AddFlightComponent } from './add-flight/add-flight.component';

export const routes: Routes = [
    {   path: '', component: HomeComponent,
        children: [
            { path: "flights", component: FlightComponent },
            { path: "add-flight", component: AddFlightComponent}
            // { path: "planes", component: PlaneComponent },
            // { path: "users", component: UserComponent }
        ]
    },
    
];
