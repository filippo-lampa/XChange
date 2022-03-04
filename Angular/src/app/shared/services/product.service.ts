import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct!: Product;
  products!: Product[];

  readonly baseURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  postProduct(prod: Product, userId: String){
    return this.http.post(this.baseURL + `/${userId}`, prod);
  }

  getProductList(){
    return this.http.get(this.baseURL);
  }

  getProduct(productId: string){
    return this.http.get(this.baseURL + `/${productId}`);
  }

  putProduct(prod: Product, userId: String){
    return this.http.put(this.baseURL + `/${userId}` + `/${prod._id}`, prod);
  }

  deleteProduct(productId: string, userId: String){
    return this.http.delete(this.baseURL + `/${userId}` + `/${productId}`);
  }
}
