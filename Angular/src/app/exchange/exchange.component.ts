import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  @Input()
  selectedProductName: String = "";
  selectedProduct!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
