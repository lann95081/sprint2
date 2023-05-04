import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  productId: number;
  productDetail: Product;
  num = 1;
  price: number;
  total: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('productId');
      this.findProductById(this.productId);
    });
  }

  findProductById(productId: number) {
    this.productService.findProductById(productId).subscribe(item => {
      this.productDetail = item;
      this.price = item.price;
      this.total = this.price;
    });
  }

  minus() {
    if (this.num <= 1) {
      this.num = 1;
    } else {
      this.num--;
    }
    this.total = this.num * this.price;
  }

  plus() {
    this.num++;
    this.total = this.num * this.price;
  }
}
