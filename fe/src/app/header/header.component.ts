import {Component, OnInit} from '@angular/core';
import {ShareService} from '../service/share.service';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';
import {CartDetailService} from '../service/cart-detail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username?: string;
  img?: string;
  name?: string;
  role?: string;
  isLoggedIn = false;
  itemCount = 0;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private accountService: UserService,
              private cart: CartDetailService,
              private router: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.shareService.getCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  loader() {
    this.shareService.getClickEvent();
    this.shareService.getCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
      this.isLoggedIn = this.username != null;
      this.findNameUser();
    } else {
      this.isLoggedIn = false;
    }
  }

  findNameUser(): void {
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.name = next.name;
      this.cart.findAllCart(next?.userId).subscribe(item => {
        this.itemCount = item?.length;
      });
    });
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.ngOnInit();
    this.shareService.setCount(0);
    this.router.navigateByUrl('/login');
  }
}
