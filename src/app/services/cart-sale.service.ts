import { Injectable } from '@angular/core';
import type { Product } from '../interfaces/product';
import type { Sale } from '../interfaces/sale';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import type { SalesResponse } from '../interfaces/salesResponse';
import { authHeader } from '../helpers/auth-header';
@Injectable({
  providedIn: 'root',
})
export class CartSaleService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  private readonly taxRate = 0.13;
  private subtotal: number = 0;
  private cartItemCount = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}
  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  getCartItemCount() {
    return this.cartItemCount;
  }
  addProduct(product: Product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.subtotal += product.price * product.amount;
    this.cartSubject.next(this.cart); // Notifica a los suscriptores sobre el cambio
  }
  getSubtotal(): number {
    return this.subtotal;
  }

  getTax(): number {
    return this.subtotal * this.taxRate;
  }
  getTotal(): number {
    return this.subtotal + this.getTax();
  }
  removeProduct(product: Product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
        this.subtotal = this.cart.reduce(
          (sum, item) => sum + item.price * item.amount,
          0
        );

        this.cartSubject.next(this.cart); // Notifica a los suscriptores sobre el cambio
      }
    }
  }
  completeSale(): void {
    const sale: Sale = {
      products: [...this.cart],
      subtotal: this.subtotal,
      total: this.getTotal(),
      tax: this.getTax(),
      date: new Date().toISOString(),
    };

    this.createSale(sale).subscribe({
      next: (response) => {
        console.log('Sale successfully created', response);
        // Limpia el carrito y actualiza el estado
        this.cart = [];
        this.subtotal = 0;
        this.cartItemCount.next(0);
        this.cartSubject.next(this.cart);
      },
      error: (err) => {
        console.error('Error creating sale', err);
      },
    });
    this.cart = [];
    this.subtotal = 0;
    this.cartItemCount.next(0);
    this.cartSubject.next(this.cart); // Notifica a los suscriptores sobre el cambio
  }

  private apiUrl = 'http://localhost:3000/api/sales';

  getAllSales(): Observable<SalesResponse> {
    return this.http.get<SalesResponse>(this.apiUrl, authHeader());
  }

  getSalesHistory(): Observable<SalesResponse> {
    return this.getAllSales();
  }

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale, authHeader()).pipe(
      catchError((error) => {
        console.error('Error creating sale', error);
        return throwError(error);
      })
    );
  }
}
