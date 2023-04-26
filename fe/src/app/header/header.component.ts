import {Component, OnInit} from '@angular/core';
import {ShareService} from '../service/share.service';
import {TokenStorageService} from '../service/token-storage.service';
import Swal from 'sweetalert2';
import {UserService} from '../service/user.service';

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

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private accountService: UserService) {
  }

  ngOnInit(): void {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.findNameUser();
    console.log(this.isLoggedIn + 'ddddd');
  }

  findNameUser(): void {
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.name = next.name;
    });
  }

  logOut() {
    this.tokenStorageService.signOut();
    console.log('a' + this.isLoggedIn);
    this.isLoggedIn = false;
    this.ngOnInit();
    location.reload();
  }
}
