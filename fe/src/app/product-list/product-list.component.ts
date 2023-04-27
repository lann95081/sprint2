import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {BrandService} from '../service/brand.service';
import {Brand} from '../model/brand';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  nameSearch: '';
  brands: Brand[];
  brandId: '0';


  constructor(private productService: ProductService,
              private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.findAll();
    this.findAllBrand();
  }

  findAll() {
    if (this.brandId === undefined) {
      this.brandId = '0';
      if (this.nameSearch === undefined) {
        this.nameSearch = '';
      }
      this.productService.findAllByNameSearch(this.nameSearch).subscribe(data => {
        this.products = data.content;
      });
    } else {
      this.productService.findAllByNameSearchAndBrand(this.nameSearch, this.brandId).subscribe(data => {
        this.products = data.content;
        console.log(this.brandId + 'aaa');
      });
    }
  }

  search() {
    this.ngOnInit();
  }

  findAllBrand() {
    this.brandService.findAll().subscribe(data => {
      this.brands = data;
    });
  }
}
