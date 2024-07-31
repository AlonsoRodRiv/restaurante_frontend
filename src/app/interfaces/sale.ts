import type { Product } from './product';

export interface Sale {
  products: Product[];
  date: string;
  subtotal: number;
  tax: number;
  total: number;
}
