import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Brand} from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>('http://localhost:8080/api/brand');
  }
}
