import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})

export class FlightService {
  
  constructor(private httpClient: HttpClient) {}

  getFlightById(flightId: number): Observable<Flight> {
    return this.httpClient.get<Flight>("http://localhost:8080/api/admin/flights/" + flightId)
  }

  getAllFlights(): Observable<Array<Flight>> {
    return this.httpClient.get<Array<Flight>>("http://localhost:8080/api/admin/flights")
  }
  
  saveFlight(flightData: Flight): Observable<Flight> {
    return this.httpClient.post<Flight>("http://localhost:8080/api/admin/flights", flightData);
  }

  updateFlight(flightId: number, flightData: Flight): Observable<Flight> {
    return this.httpClient.put<Flight>("http://localhost:8080/api/admin/flights/" + flightId, flightData);
  }

  deleteFlight(flightId: number): Observable<Flight> {
    return this.httpClient.delete<Flight>("http://localhost:8080/api/admin/flights/" + flightId);    
  }

}
