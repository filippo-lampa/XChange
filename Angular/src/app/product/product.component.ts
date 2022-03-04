import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  productId!: string;
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.productId = params['id']);
   }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe((data) =>{
      this.product = data as Product;
    });
  }

}
