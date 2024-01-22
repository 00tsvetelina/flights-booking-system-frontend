import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Promo } from '../models/promo';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private httpClient: HttpClient) {}

  getPromoById(promoId: number): Observable<Promo> {
    return this.httpClient.get<Promo>("http://localhost:8080/api/admin/promos/" + promoId)
  }

  getAllPromos(): Observable<Array<Promo>> {
    return this.httpClient.get<Array<Promo>>("http://localhost:8080/api/admin/promos")
  }
  
  savePromo(promoData: Promo): Observable<Promo> {
    return this.httpClient.post<Promo>("http://localhost:8080/api/admin/promos", promoData);
  }

  updatePromo(promoId: number, promoData: Promo): Observable<Promo> {
    return this.httpClient.put<Promo>("http://localhost:8080/api/admin/promos/" + promoId, promoData);
  }

  deletePromo(promoId: number): Observable<Promo> {
    return this.httpClient.delete<Promo>("http://localhost:8080/api/admin/promos/" + promoId);    
  }

}