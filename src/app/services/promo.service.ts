import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Promo } from '../models/promo';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private httpClient: HttpClient) {}

  // get promo by promoId
  getPromoById(promoId: number): Observable<Promo> {
    return this.httpClient.get<Promo>("http://localhost:8080/api/admin/promos/" + promoId)
  }

  // get all promos
  getAllPromos(): Observable<Array<Promo>> {
    return this.httpClient.get<Array<Promo>>("http://localhost:8080/api/admin/promos")
  }
  
  // save promo
  savePromo(promoData: Promo): Observable<Promo> {
    return this.httpClient.post<Promo>("http://localhost:8080/api/admin/promos", promoData);
  }

  // edit promo
  updatePromo(promoId: number, promoData: Promo): Observable<Promo> {
    return this.httpClient.put<Promo>("http://localhost:8080/api/admin/promos/" + promoId, promoData);
  }

  // delete promo
  deletePromo(promoId: number): Observable<Promo> {
    return this.httpClient.delete<Promo>("http://localhost:8080/api/admin/promos/" + promoId);    
  }

}