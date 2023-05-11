import { Component, OnInit } from '@angular/core';
import {PurchaseHistory} from '../model/purchase-history';
import {CartDetailService} from '../service/cart-detail.service';
import {UserService} from '../service/user.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  username = '';
  purchaseHistories: PurchaseHistory[];

  constructor(private cartDetailService: CartDetailService,
              private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.userService.findUserEmail(this.username).subscribe(next => {
      this.cartDetailService.findAllHistory(next.userId).subscribe(data => {
        this.purchaseHistories = data;
      });
    });
  }

}
