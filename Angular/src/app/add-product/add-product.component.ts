import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { Product } from '../shared/models/product.model';
import { CategoryService } from '../shared/services/category.service';
import { ProductService } from '../shared/services/product.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: any = {
    name: null,
    category: null,
    description: null,
    imageUrl: null
  }

  categoriesList!: Category[];
  isLoaded = false;
  selectedCategory!: string;

  constructor(private tokenStorageService: TokenStorageService, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(
      data => {
        this.categoriesList = data as Category[];
        console.log(this.categoriesList);
        this.isLoaded = true;
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  onAddProduct() {
    const product: Product = {
      name: this.form.name,
      category: this.selectedCategory,
      description: this.form.description,
      views: 0,
      uploadDate: new Date(),
      imageUrl: this.form.imageUrl,
      sellerId: this.tokenStorageService.getUserId()
    }

    this.productService.postProduct(product, this.tokenStorageService.getUserId()).subscribe(
      data => {
        console.log("ok");
      },
      err => {
        console.log(err.error.message);
      }
    )

  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

}
