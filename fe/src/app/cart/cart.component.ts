import {Component, OnInit} from '@angular/core';
import {CartDetailService} from '../service/cart-detail.service';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {ICartDetailDto} from '../dto/icart-detail-dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetailDtos: ICartDetailDto[];
  username: string;
  userId: number;
  num = 1;
  price: number;
  total: number;

  constructor(private cart: CartDetailService,
              private token: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
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


  getUser() {
    this.username = this.token.getUser()?.username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.userId = next.userId;
      this.getAll(this.userId);
    });
  }

  getAll(userId: number) {
    this.cart.findAllCart(userId).subscribe(data => {
      // @ts-ignore
      this.cartDetailDtos = data;
    });
  }

}
