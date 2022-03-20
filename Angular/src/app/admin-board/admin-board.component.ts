import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/models/category.model';
import { Product } from '../shared/models/product.model';
import { User } from '../shared/models/user.model';
import { CategoryService } from '../shared/services/category.service';
import { ProductService } from '../shared/services/product.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { UserService } from '../shared/services/user.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  formCategory: any = {
    name: null,
    imageUrl: null,
  }

  formPutCategory: any = {
    name: null,
    imageUrl: null,
  }
  categoriesList!: Category[];
  selectedCategory!: Category;
  userList!: User[];
  selectedUser!: User;
  productList!: Product[];
  selectedProduct!: Product;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router,
    private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.userService.getUser(this.tokenStorageService.getUserId()).subscribe((data) => {
        var user = data as User;
        if (user.role != "ADMIN") {
          this.router.navigate(['/']);
        }
      });
    }
    else {
      this.router.navigate(['/']);
    }
    this.onGetCategories();
    this.onGetAllUsers();
    this.onGetAllProducts();
  }

  private onGetCategories() {
    this.categoryService.getCategoriesList().subscribe(
      data => {
        this.categoriesList = data as Category[];
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  onAddCategory() {
    const category: Category = {
      name: this.formCategory.name,
      imageUrl: this.formCategory.imageUrl,
    }

    this.categoryService.postCategory(category).subscribe((data) => {
      M.toast({ html: 'Category added', classes: 'rounded green toast-container', displayLenght: 2000 });
      this.ngOnInit();
    })
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  onPutCategory() {
    if (this.formPutCategory.name != undefined) {
      this.selectedCategory.name = this.formPutCategory.name;
    }

    if (this.formPutCategory.imageUrl != undefined) {
      this.selectedCategory.imageUrl = this.formPutCategory.imageUrl;
    }
    this.categoryService.putCategory(this.selectedCategory).subscribe(
      (data) => {
        M.toast({ html: 'Category changed', classes: 'rounded green toast-container', displayLenght: 2000 });
        this.ngOnInit();
      }
    )
  }

  onDeleteCategory() {
    if (this.selectedCategory != undefined || this.selectedCategory != null) {
      this.categoryService.deleteCategory(this.selectedCategory).subscribe(
        (data) => {
          M.toast({ html: 'Category removed', classes: 'rounded green toast-container', displayLenght: 2000 });
          this.ngOnInit();
        }
      )
    }
  }

  private onGetAllUsers() {
    this.userService.getUserList().subscribe(
      (data) => {
        this.userList = data as User[];
      }
    )
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onDeleteUser() {
    if (this.selectedUser != undefined || this.selectedUser != null) {
      this.userService.deleteUser(this.selectedUser._id!).subscribe(
        (data) => {
          M.toast({ html: 'User deleted', classes: 'rounded green toast-container', displayLenght: 2000 });
          this.ngOnInit();
        }
      )
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  private onGetAllProducts() {
    this.productService.getProductList().subscribe(
      (data) => {
        this.productList = data as Product[];
      }
    )
  }

  onDeleteProduct() {
    if (this.selectedProduct != undefined || this.selectedProduct != null) {
      this.productService.deleteProduct(this.selectedProduct._id!, this.tokenStorageService.getUserId()).subscribe(
        (data) => {
          M.toast({ html: 'Product deleted', classes: 'rounded green toast-container', displayLenght: 2000 });
          this.ngOnInit();
        }
      )
    }
  }

}
