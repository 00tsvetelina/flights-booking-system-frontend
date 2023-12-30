export interface Flight { 
    id?: number,
    plane?: Object,
    origin: string,
    destination: string, 
    departureTime: Date,
    delayInMins: number,
    price: number,
    seatsCount: number
}