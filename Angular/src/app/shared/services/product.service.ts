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

  readonly baseURL = 'http://xchangenet.herokuapp.com/api/products';

  constructor(private http: HttpClient) { }

  postProduct(prod: Product, userId: string){
    return this.http.post(this.baseURL + `/${userId}`, prod);
  }

  getProductList(){
    return this.http.get(this.baseURL);
  }

  getUserProducts(userId: string){
    return this.http.get(this.baseURL + `/${userId}` + '/alluserproducts');
  }

  getProduct(productId: string){
    return this.http.get(this.baseURL + `/${productId}`);
  }

  putProduct(prod: Product, userId: string){
    return this.http.put(this.baseURL + `/${userId}` + `/${prod._id}`, prod);
  }

  deleteProduct(productId: string, userId: string){
    return this.http.delete(this.baseURL + `/${userId}` + `/${productId}`);
  }
}
