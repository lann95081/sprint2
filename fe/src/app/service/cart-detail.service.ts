import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartDetail} from '../model/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor(private httpClient: HttpClient) {
  }

  addCartDetail(userId: number, productId: number): Observable<CartDetail[]> {
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/cart/addCart/' + userId + '/' + productId);
  }

  findAllCart(userId: number): Observable<CartDetail[]> {
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/cart/' + userId);
  }
}
