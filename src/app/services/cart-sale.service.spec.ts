import { TestBed } from '@angular/core/testing';

import { CartSaleService } from './cart-sale.service';

describe('CartSaleService', () => {
  let service: CartSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
