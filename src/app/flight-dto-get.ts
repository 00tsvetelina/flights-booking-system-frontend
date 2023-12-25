export interface FlightDtoGet { 
    id: string,
    plane: Object,
    origin: string,
    destination: string, 
    departureTime: Date,
    delayInMins: number,
    price: number,
    seatsCount: number
}