import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {CartDetailService} from '../service/cart-detail.service';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ShareService} from '../service/share.service';
import {User} from '../model/user';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  cartDetailDtos: ICartDetailDto[];
  userId: number;
  sum = 0;
  total = 0;
  username = '';
  user: User;

  constructor(private cartDetailService: CartDetailService,
              private token: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.getTotal();
  }

  setCart() {
    this.username = this.token.getUser()?.username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.userId = next.userId;
      this.cartDetailService.setCart(this.userId).subscribe(data => {
        this.shareService.sendClickEvent();
      });
    });
  }

  getTotal() {
    this.username = this.token.getUser()?.username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.userId = next.userId;
      console.log(this.userId + 'nan khung');
      this.cartDetailService.findAllCart(this.userId).subscribe(item => {
        this.cartDetailDtos = item;
        for (const key of this.cartDetailDtos) {
          this.total += key.price * key.amount;
        }
        this.renderPayPalBtn();
      });
    });
  }

  renderPayPalBtn() {
    document.getElementById('paypalBtn').innerHTML = '<div id="paypalButtons" style="margin-left: 300px"></div>';
    render(
      {
        id: '#paypalButtons',
        value: (this.total / 23000).toFixed(2),
        currency: 'USD',
        onApprove: async (details) => {
          // alert('Payment success!');
          await Swal.fire({
            title: 'Thông báo!',
            text: 'Thanh toán thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await this.setCart();
          await this.router.navigateByUrl('/cart');
        }
      }
    );
  }
}
