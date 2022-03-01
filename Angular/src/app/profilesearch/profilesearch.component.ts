import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { ProductService } from '../shared/product.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Product } from '../shared/product.model';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-profilesearch',
  templateUrl: './profilesearch.component.html',
  styleUrls: ['./profilesearch.component.css'],
  providers: [UserService,ProductService,CategoryService]
})
export class ProfilesearchComponent implements OnInit {

  operationSelector: Number = 0;
  userName: String = "";
  userList: User[] = [];
  searchedUserList!: User[];
  productList: Product[] = [];
  searchedProductList!: Product[];
  productName: String = "";
  categoryList: Category[] = [];

  searchedString: String = "";

  constructor(private userService: UserService, private productService: ProductService, private categoryService: CategoryService) {
   }

  ngOnInit(): void {

  }

  selectOperation(op: Number){
    this.operationSelector = op;
    if(op == 0){
      this.showCategories();
    }
  }

  clearSearchLists(){
    this.searchedProductList = [];
    this.searchedUserList = [];
    this.categoryList = [];
    this.searchedString = "";
  }

  search(){
    this.clearSearchLists;
    switch(this.operationSelector){
      case 1: this.searchUser(); break;
      case 2: this.searchProduct(); break;
    }
  }

  showCategories(){
      this.categoryService.getCategoriesList().subscribe(res=>{
        this.categoryList = res as Category[];
      });
  }

  searchUser() {
      this.userService.getUserList().subscribe(res=>{
        this.userList = res as User[];
      });
      this.searchedUserList = this.userList.filter(user => user.username.toLowerCase().includes(this.searchedString.toLowerCase()));
  }

  searchProduct() {
    this.productService.getProductList().subscribe(res=>{
      this.productList = res as Product[];
    });
    this.searchedProductList = this.productList.filter(product => product.name.toLowerCase().includes(this.searchedString.toLowerCase()));

}

}
