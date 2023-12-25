export interface FlightDtoPost { 
    origin: string,
    destination: string, 
    departureTime: Date,
    delayInMins: number,
    price: number,
    seatsCount: number
}