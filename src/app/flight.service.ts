import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { FlightDtoPost } from './flight-dto-post';
import { FlightDtoGet } from './flight-dto-get';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private httpClient: HttpClient) {}

  getFlightById(flightId: number): Observable<FlightDtoGet> {
    return this.httpClient.get<FlightDtoGet>("http://localhost:8080/api/admin/flights/" + flightId)
  }
  
  saveFlight(flightData: FlightDtoPost): Observable<FlightDtoPost> {
    return this.httpClient.post<FlightDtoPost>("http://localhost:8080/api/admin/flights", flightData);
  }

  getAllFlights(): Observable<Array<FlightDtoGet>> {
    return this.httpClient.get<Array<FlightDtoGet>>("http://localhost:8080/api/admin/flights")
  }


}
