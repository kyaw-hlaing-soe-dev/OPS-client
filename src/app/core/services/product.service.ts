import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { Product } from '../models/product.model';

const MOCK_PRODUCTS: readonly Product[] = [
  {
    id: 1,
    name: 'Everyday Backpack',
    sku: 'OPS-BAG-001',
    description: 'A durable backpack for daily commutes and short trips.',
    price: 59.99,
    stock: 18,
    imageUrl: 'https://placehold.co/600x400/png?text=Everyday+Backpack',
  },
  {
    id: 2,
    name: 'Insulated Travel Mug',
    sku: 'OPS-MUG-002',
    description: 'A reusable insulated mug that keeps drinks at the right temperature.',
    price: 24.5,
    stock: 42,
    imageUrl: 'https://placehold.co/600x400/png?text=Travel+Mug',
  },
  {
    id: 3,
    name: 'Desk Organizer',
    sku: 'OPS-DESK-003',
    description: 'A compact organizer for keeping a workspace clear and practical.',
    price: 31.25,
    stock: 7,
    imageUrl: 'https://placehold.co/600x400/png?text=Desk+Organizer',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /**
   * Temporary typed catalog for frontend development.
   * Replace this method with the verified Order Service request in M8.
   */
  getProducts(): Observable<readonly Product[]> {
    return of(MOCK_PRODUCTS).pipe(delay(150));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id)),
    );
  }
}
