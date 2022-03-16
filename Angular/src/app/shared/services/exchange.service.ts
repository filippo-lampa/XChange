import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  offeredProducts: Product[] = [];
  userProducts: Product[] = [];

  readonly baseURL = 'http://localhost:8080/exchangecenter';

  constructor(private productService: ProductService, private http: HttpClient) { }

  saveExchange(exchangePayload: any){
    return this.http.post(this.baseURL + '/results/', exchangePayload);
  }

  getUserProducts(userId: string){
    return this.productService.getUserProducts(userId);
  }
}
