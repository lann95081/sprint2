import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product');
  }

  findProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/api/product-detail/' + productId);
  }

  findAllByNameSearch(nameSearch: string, totalElement: number): Observable<Page<Product>> {
    return this.httpClient.get<Page<Product>>('http://localhost:8080/api/product/list?nameSearch=' + nameSearch + '&totalElement=' + totalElement);
  }

  findAllByNameSearchAndBrand(nameSearch: string, brandId: string, totalElement: number): Observable<Page<Product>> {
    return this.httpClient.get<Page<Product>>('http://localhost:8080/api/product/list?nameSearch=' + nameSearch + '&brandId=' + brandId + '&totalElement=' + totalElement);
  }
}
