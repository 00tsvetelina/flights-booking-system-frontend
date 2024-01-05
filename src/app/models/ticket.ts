import { Flight } from "./flight";
import { Promo } from "./promo";
import { User } from "./user";

export interface Ticket {
    id?: number,
    flight?: Flight,
    destination: string,
    departureTime: Date,
    origin: string,
    seat?: string, //TODO see if i should remove ?
    user?: User,
    ticketPrice: number,
    promos: Array<Promo> 
}