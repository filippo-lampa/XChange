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

  formToModify: any = {
    name: null,
    category: null,
    description: null,
    imageUrl: null
  }

  categoriesList!: Category[];
  isLoaded: Boolean = false;
  selectedCategory!: string;
  productList!: Product[];
  selectedProduct!: string;
  showDeleteProduct: Boolean = false;
  productToModify!: Product;

  constructor(private tokenStorageService: TokenStorageService, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(
      data => {
        this.categoriesList = data as Category[];
        this.isLoaded = true;
      },
      err => {
        console.log(err.error.message);
      }
    )

    this.productService.getUserProducts(this.tokenStorageService.getUserId()).subscribe(
      data => {
        this.productList = data as Product[];
        if (this.productList.length > 0) {
          this.showDeleteProduct = true;
        }
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  onAddProduct() {
    if (this.selectedCategory != undefined || this.selectedCategory != null) {
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
          this.selectedCategory = '';
          this.ngOnInit();
        },
        err => {
          console.log(err.error.message);
        }
      )
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  onDeleteProduct() {
    if (this.selectedProduct != undefined || this.selectedProduct != null) {
      this.productService.deleteProduct(this.selectedProduct, this.tokenStorageService.getUserId()).subscribe(
        data => {
          this.selectedProduct = '';
          this.ngOnInit();
        },
        err => {
          console.log(err.error.message);
        }
      )
    }
  }

  selectProduct(product: string) {
    this.selectedProduct = product;
  }

  selectProductToModify(product: Product) {
    this.productToModify = product;
    this.formToModify.name = product.name;
    this.formToModify.category = product.category;
    this.formToModify.description = product.description;
    this.formToModify.imageUrl = product.imageUrl;
  }

  onModifyProduct() {
    if (this.productToModify != undefined || this.productToModify != null) {
      const product: Product = {
        _id: this.productToModify._id,
        name: this.formToModify.name,
        category: this.selectedCategory,
        description: this.formToModify.description,
        views: this.productToModify.views,
        uploadDate: this.productToModify.uploadDate,
        imageUrl: this.formToModify.imageUrl,
        sellerId: this.productToModify.sellerId
      }

      this.productService.putProduct(product, this.tokenStorageService.getUserId()).subscribe(
        data => {
          this.selectedCategory = '';
          this.ngOnInit();
        },
        err => {
          console.log(err.error.message);
        }
      )
    }

  }

}
