import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ExchangeService } from '../shared/services/exchange.service';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  @Input()
  selectedProductName: string = "";
  selectedProduct!: Product;
  userProducts: Product[] =[];

  constructor(private exchangeService: ExchangeService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.exchangeService.getUserProducts(this.tokenService.getUserId()).subscribe(data=>this.userProducts = data as Product[]);
  }

  checkOfferedProducts(productToCheck: Product){
    var offeredProducts = this.exchangeService.offeredProducts;
    if(offeredProducts.includes(productToCheck)){
      delete this.exchangeService.offeredProducts[offeredProducts.indexOf(productToCheck)];
    }
    else{
      this.exchangeService.offeredProducts.push(productToCheck);
    }
  }

}
