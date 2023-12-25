import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { FlightDto } from './flight-dto';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) {}

  getFlightById(flightId: number): Observable<FlightDto> {
    return this.httpClient.get<FlightDto>("http://localhost:8080/api/admin/flights/" + flightId)
  }
  
  saveFlight(flightData: FlightDto): Observable<FlightDto> {
    return this.httpClient.post<FlightDto>("http://localhost:8080/api/admin/flights", flightData);
  }

  getAllFlights(): Observable<Array<FlightDto>> {
    return this.httpClient.get<Array<FlightDto>>("http://localhost:8080/api/admin/flights")
  }


}
