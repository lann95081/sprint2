import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {BrandService} from '../service/brand.service';
import {Brand} from '../model/brand';
import {CartDetailService} from '../service/cart-detail.service';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import Swal from 'sweetalert2';
import {ShareService} from '../service/share.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  nameSearch: '';
  brands: Brand[];
  brandId = '0';
  totalElement = 4;
  maxElement = 0;
  flagHidden = true;
  flagMore = false;
  username: string;
  userId: number;

  constructor(private productService: ProductService,
              private brandService: BrandService,
              private cartDetailService: CartDetailService,
              private token: TokenStorageService,
              private userService: UserService,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAll(this.totalElement);
    this.findAllBrand();
    this.getUser();
  }

  findAll(totalElement: number) {
    if (this.nameSearch === undefined) {
      this.nameSearch = '';
    }
    if (this.brandId === undefined) {
      this.brandId = '0';

      this.productService.findAllByNameSearch(this.nameSearch, this.totalElement).subscribe(data => {
        this.products = data.content;
        this.maxElement = data.totalElements;
      });
    } else {
      this.productService.findAllByNameSearchAndBrand(this.nameSearch, this.brandId, this.totalElement).subscribe(data => {
        this.products = data.content;
        this.maxElement = data.totalElements;
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

  hidden() {
    if (this.totalElement <= 4) {
      this.flagMore = false;
      this.flagHidden = true;
    } else {
      this.totalElement -= 4;
      this.flagHidden = this.totalElement === 4;
      this.flagMore = false;
    }
    this.findAll(this.totalElement);
  }

  loadMore() {
    if (this.totalElement < this.maxElement) {
      this.flagMore = false;
      this.totalElement += 4;
      this.flagHidden = false;
    }
    if (this.totalElement > this.maxElement) {
      this.flagMore = true;
      this.flagHidden = false;
    }
    this.findAll(this.totalElement);
  }

  addCartDetail(productId: number) {
    this.cartDetailService.addCartDetail(this.userId, productId, 1).subscribe(() => {
      Swal.fire({
        title: 'Thông báo!',
        text: 'Thêm mới giỏ hàng thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.cartDetailService.findAllCart(this.userId).subscribe(item => {
        this.shareService.setCount(item.length);
      });
    }, error => {
      if (!this.tokenStorageService.getToken()) {
        Swal.fire({
          title: 'Thông báo!',
          text: 'Bạn phải đăng nhập trước khi muốn mua hàng',
          icon: 'error',
          confirmButtonText: 'OK'
          // timer: 10
        });
      }
      this.router.navigateByUrl('/login');
    });
  }

  getUser() {
    this.username = this.token.getUser()?.username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.userId = next?.userId;
    });
  }
}
