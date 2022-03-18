import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute} from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from '../shared/services/notification.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
// @ts-ignore
import * as M from "../../../node_modules/materialize-css/dist/js/materialize";
import { ExchangeService } from '../shared/services/exchange.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  @Input()
  sellerId: string = "";
  @Input()
  category: string = "";
  @Input()
  productList: Product[] = [];
  selectedProduct: Product = new Product;
  offeredProducts: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private elementRef: ElementRef, private swPush: SwPush,
    private notificationService: NotificationService, private tokenStorageService: TokenStorageService, private exchangeService: ExchangeService) {
    if (this.route.params) {
      this.route.params.subscribe(params => this.category = params['name']);
    }
  }

  ngOnInit(): void {
    if(this.productList.length == 0)
      this.productService.getProductList().subscribe((res) => {
        this.productList = res as Product[];
      });
  }

  ngAfterViewInit() {
    var elems = this.elementRef.nativeElement.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var carouselOptions = {
      fullWidth: true
    }
    var elems2 = document.querySelector('.carousel');
    var instances = M.Carousel.init(elems2, carouselOptions);
  }

  setSelectedProduct(selectedProduct: Product) {
    this.selectedProduct = selectedProduct;
  }

  sendExchangeNotification(receiverUserId: string) {

    var notificationPayload = {
      "notification": {
        "title": "Exchange offer",
        "body": "New exchange offer received",
        "icon": "assets/main-page-logo-small-hat.png",
        "vibrate": [100, 50, 100],
        "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
        },
        "actions": [{
          "action": "explore",
          "title": "Go to the site"
        }],
        "notificationType": "exchangeRequest"
      }
    };

    if (this.exchangeService.offeredProducts.length > 0) {
      var productsPayload = {
        "requested_product_id": this.selectedProduct._id,
        "offered_products": this.exchangeService.offeredProducts
      }

      this.notificationService.send(this.tokenStorageService.getUserId()!, receiverUserId, Object.assign(notificationPayload, productsPayload));

    } else console.log("No item to exchange selected");
  }

}
