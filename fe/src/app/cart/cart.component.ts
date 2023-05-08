import {Component, OnInit} from '@angular/core';
import {CartDetailService} from '../service/cart-detail.service';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {ProductService} from '../service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetailDtos: ICartDetailDto[];
  username: string;
  userId: number;
  sum = 0;
  price: number;
  total = 0;
  ship = 30000;

  constructor(private cart: CartDetailService,
              private token: TokenStorageService,
              private userService: UserService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.username = this.token.getUser()?.username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.userId = next.userId;
      this.cart.findAllCart(this.userId).subscribe(data => {
        this.cartDetailDtos = data;
        this.getTotal();

      });
    });
  }

  minus(cartDetailId: number) {
    console.log(this.cartDetailDtos);
    for (const items of this.cartDetailDtos) {
      if (items.cartDetailId === cartDetailId) {
        if (items.amount <= 1) {
          break;
        } else {
          items.amount--;
          console.log(items.amount + 'a');
          this.cart.updateAmount(items.amount, cartDetailId).subscribe(() => {
          });
          this.sum -= items.price;
          this.total = this.sum + this.ship;
          console.log(this.total);
          break;
        }
      }
    }
  }

  plus(cartDetailId: number) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartDetailDtos.length; i++) {
      if (this.cartDetailDtos[i].cartDetailId === cartDetailId) {
        this.cartDetailDtos[i].amount++;
        this.cart.updateAmount(this.cartDetailDtos[i].amount, cartDetailId).subscribe(() => {
        }, error => {
        });

        this.sum += this.cartDetailDtos[i].price;
        this.total = this.sum + this.ship;
        break;
      }
    }
  }

  getTotal() {
    for (const element of this.cartDetailDtos) {
      this.sum += element.amount * element.price;
    }
    this.total = this.sum + this.ship;
  }

  getAll(userId: number) {
    this.cart.findAllCart(userId).subscribe(data => {
      this.cartDetailDtos = data;

    });
  }

  delete(cartId: number, productId: number, productName: string, cartDetailId: number) {
    this.cart.delete(cartId, productId).subscribe(() => {
      Swal.fire({
        title: 'Thông báo!',
        text: 'Bạn vừa xoá mặt hàng ' + productName,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.cart.findAllCart(this.userId).subscribe(item => {
        this.cartDetailDtos = item;
      });
      for (const item of this.cartDetailDtos) {
        if (item.cartDetailId === cartDetailId) {
          this.sum -= item.price * item.amount;
          this.total = this.sum + this.ship;
          break;
        }
      }
    });
  }

}
