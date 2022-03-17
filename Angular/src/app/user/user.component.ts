import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  userId!: string;
  selectedUser!: User;
  loggedUserId: string = "";
  userBirthday!: string;
  userAge!: number;
  isLoaded = false;
  userItemsCounter: number = 0;
  userProducts: Product[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private productService: ProductService) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.ngOnInit();
    }
    );
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.loggedUserId = this.tokenStorageService.getUserId();
      this.productService.getUserProducts(this.userId).subscribe(data => { this.userProducts = data as Product[]; this.userItemsCounter = this.userProducts.length; });
    }
    this.userService.getUser(this.userId).subscribe((data) => {
      this.selectedUser = data as User;
      this.userBirthday = this.selectedUser.birthday.toLocaleString().substring(0, this.selectedUser.birthday.toLocaleString().indexOf('T'));
      this.userAge = new Date().getFullYear() - Number(this.userBirthday.substring(0, this.userBirthday.indexOf('-')));
      this.isLoaded = true;
    });
  }
}
