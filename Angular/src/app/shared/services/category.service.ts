import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedCategory!: Category;
  categories!: Category[];

  readonly baseURL = 'http://xchangenet.herokuapp.com/api/categories';

  constructor(private http: HttpClient) { }

  postCategory(cat: Category) {
    return this.http.post(this.baseURL, cat);
  }

  getCategoriesList() {
    return this.http.get(this.baseURL);
  }

  getCategory(categoryName: string) {
    return this.http.get(this.baseURL + `/${categoryName}`);
  }

  putCategory(cat: Category) {
    return this.http.put(this.baseURL, cat);
  }

  deleteCategory(cat: Category) {
    return this.http.delete(this.baseURL + `/${cat._id}`);
  }
}
