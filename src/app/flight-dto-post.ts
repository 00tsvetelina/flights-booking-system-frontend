export interface FlightDtoPost { 
    origin: string,
    destination: string, 
    departureTime: Date,
    arrivalTime: Date,
    delayInMins: number,
    price: number,
    seatsCount: number
}