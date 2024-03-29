import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddFlightComponent } from './flight/add-flight/add-flight.component';
import { EditFlightComponent } from './flight/edit-flight/edit-flight.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { AddPlaneComponent } from './plane/add-plane/add-plane.component';
import { EditPlaneComponent } from './plane/edit-plane/edit-plane.component';
import { PlaneListComponent } from './plane/plane-list/plane-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { CartComponent } from './cart/cart.component';
import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { EditPromoComponent } from './promo/edit-promo/edit-promo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';


export const routes: Routes = [
    {   path: '', component: HomeComponent,
        children: [
            { path: "flights", component: FlightListComponent },
            { path: "add-flight", component: AddFlightComponent},
            { path: "edit-flight/:id", component: EditFlightComponent },
            { path: "planes", component: PlaneListComponent },
            { path: "add-plane", component: AddPlaneComponent },
            { path: "edit-plane/:id", component: EditPlaneComponent},
            { path: "promos", component: PromoListComponent},
            { path: "add-promo", component: AddPromoComponent},
            { path: "edit-promo/:id", component: EditPromoComponent},
            {path: 'users', component: UserListComponent}
        ]
    },
    { path: 'tickets', component: TicketComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
