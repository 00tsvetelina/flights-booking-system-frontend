export interface FlightDtoGet { 
    id: string,
    plane: Object,
    origin: string,
    destination: string, 
    departureTime: Date,
    arrivalTime: Date,
    delayInMins: number,
    price: number,
    seatsCount: number
}