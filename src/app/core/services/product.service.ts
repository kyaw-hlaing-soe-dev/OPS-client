import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { Product } from '../models/product.model';

const MOCK_PRODUCTS: readonly Product[] = [
  {
    id: 1,
    name: 'Everyday Backpack',
    sku: 'OPS-BAG-001',
    description: 'A durable backpack for daily commutes and short trips. Crafted from water-resistant canvas with padded laptop compartment and organizer pockets.',
    price: 89.00,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'Bags',
  },
  {
    id: 2,
    name: 'Insulated Travel Mug',
    sku: 'OPS-MUG-002',
    description: 'A double-walled insulated mug that keeps drinks hot for 6 hours or cold for 12. Leak-proof lid with one-hand operation.',
    price: 34.50,
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
    category: 'Drinkware',
  },
  {
    id: 3,
    name: 'Walnut Desk Organizer',
    sku: 'OPS-DESK-003',
    description: 'A minimal walnut wood organizer with slots for pens, cards, and small essentials. Keeps your workspace clear and intentional.',
    price: 45.00,
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    category: 'Desk Accessories',
  },
  {
    id: 4,
    name: 'Merino Wool Beanie',
    sku: 'OPS-APR-004',
    description: 'Soft, breathable merino wool beanie with a clean ribbed knit. Fits snug without bulk — built for cool mornings and cold commutes.',
    price: 38.00,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80',
    category: 'Apparel',
  },
  {
    id: 5,
    name: 'Canvas Tote',
    sku: 'OPS-BAG-005',
    description: 'Heavyweight organic cotton tote with reinforced handles and an interior zip pocket. Carries everything from groceries to gym gear.',
    price: 28.00,
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80',
    category: 'Bags',
  },
  {
    id: 6,
    name: 'Ceramic Pour-Over Set',
    sku: 'OPS-DRK-006',
    description: 'Hand-thrown ceramic dripper and carafe set for a slow, deliberate morning brew. Includes stainless steel filter for zero-waste brewing.',
    price: 62.00,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    category: 'Drinkware',
  },
  {
    id: 7,
    name: 'Leather Tech Sleeve',
    sku: 'OPS-TEC-007',
    description: 'Full-grain leather sleeve sized for 13–14" laptops. Wool-felt lined interior with a magnetic closure that opens flat.',
    price: 78.00,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    category: 'Tech Accessories',
  },
  {
    id: 8,
    name: 'Soy Wax Candle — Cedar & Moss',
    sku: 'OPS-HOM-008',
    description: 'Hand-poured soy wax candle with notes of cedar, moss, and white birch. 50-hour burn time in a reusable stoneware vessel.',
    price: 32.00,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80',
    category: 'Home Goods',
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

  getProductsByCategory(category: string): Observable<readonly Product[]> {
    return this.getProducts().pipe(
      map((products) => products.filter((product) => product.category === category)),
    );
  }
}
