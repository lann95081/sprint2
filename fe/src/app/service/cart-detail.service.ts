import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartDetail} from '../model/cart-detail';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {PurchaseHistory} from '../model/purchase-history';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor(private httpClient: HttpClient) {
  }

  addCartDetail(userId: number, productId: number, amount: number): Observable<CartDetail[]> {
    return this.httpClient.get<CartDetail[]>('http://localhost:8080/api/cart/addCart/' + userId + '/' + productId + '/' + amount);
  }

  findAllCart(userId: number): Observable<ICartDetailDto[]> {
    return this.httpClient.get<ICartDetailDto[]>('http://localhost:8080/api/cart/' + userId);
  }

  updateAmount(amount: number, cartDetailId: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/cart/updateAmount/' + amount + '/' + cartDetailId);
  }

  delete(cartId: number, productId: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/cart/' + cartId + '/' + productId);
  }

  deleteAll(userId: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/cart/deleteAll/' + userId);
  }

  setCart(userId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/cart/setCart/' + userId);
  }

  findAllHistory(userId: number): Observable<PurchaseHistory[]> {
    return this.httpClient.get<PurchaseHistory[]>('http://localhost:8080/api/cart/history/' + userId);
  }

  saveHistory(userId: number, total: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/cart/save/' + userId + '/' + total);
  }
}
