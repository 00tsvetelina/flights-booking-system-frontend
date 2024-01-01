import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { PlaneListComponent } from './plane-list/plane-list.component';
import { AddPlaneComponent } from './add-plane/add-plane.component';
import { EditPlaneComponent } from './edit-plane/edit-plane.component';

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
    
];
