import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { Product } from '../interfaces/product';
import { authHeader } from '../helpers/auth-header';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/products';

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl, authHeader());
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, authHeader());
  }
}
