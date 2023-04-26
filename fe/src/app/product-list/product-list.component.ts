import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
    });
  }

}
