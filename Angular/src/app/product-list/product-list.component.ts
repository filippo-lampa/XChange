import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from '../shared/newsletter.service';
import { Globals } from '../shared/globals';

// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  @Input()
  sellerId: String = "";
  @Input()
  category: String = "";
  productList: Product[] = [];
  selectedProduct: Product = new Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private elementRef:ElementRef,  private swPush: SwPush, private newsletterService: NewsletterService) {
    if(this.route.params){
      this.route.params.subscribe(params=> this.category = params['name']);
    }
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((res)=>{
      this.productList = res as Product[];
    });
  }

  ngAfterViewInit() {
    var elems = this.elementRef.nativeElement.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  setSelectedProduct(selectedProduct: Product){
    this.selectedProduct = selectedProduct;
  }

  sendExchangeNotification(receiverUserId: String){
    console.log(Globals.loggedUserDetails._id);
    this.newsletterService.send(Globals.loggedUserDetails._id!, receiverUserId);
  }
}
