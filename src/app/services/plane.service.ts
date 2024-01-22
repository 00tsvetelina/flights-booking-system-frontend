import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Plane } from '../models/plane';

@Injectable({
  providedIn: 'root'
})

export class PlaneService {

  constructor(private httpClient: HttpClient) {}

  getPlaneById(planeId: number): Observable<Plane> {
    return this.httpClient.get<Plane>("http://localhost:8080/api/admin/planes/" + planeId)
  }

  getAllPlanes(): Observable<Array<Plane>> {
    return this.httpClient.get<Array<Plane>>("http://localhost:8080/api/admin/planes")
  }
  
  savePlane(planeData: Plane): Observable<Plane> {
    return this.httpClient.post<Plane>("http://localhost:8080/api/admin/planes", planeData);
  }

  updatePlane(planeId: number, planeData: Plane): Observable<Plane> {
    return this.httpClient.put<Plane>("http://localhost:8080/api/admin/planes/" + planeId, planeData);
  }

  deletePlane(planeId: number): Observable<Plane> {
    return this.httpClient.delete<Plane>("http://localhost:8080/api/admin/planes/" + planeId);    
  }

}