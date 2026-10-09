import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Order } from '../models/order.model';

const MOCK_ORDER: Order = {
  id: 'OPS-DEMO-1001',
  status: 'Processing',
  createdAt: '2026-10-09',
  items: [
    {
      product: {
        id: 1,
        name: 'Everyday Backpack',
        sku: 'OPS-BAG-001',
        description: 'A durable backpack for daily commutes and short trips. Crafted from water-resistant canvas with padded laptop compartment and organizer pockets.',
        price: 89.00,
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        category: 'Bags',
      },
      quantity: 1,
    },
  ],
  total: 89.00,
  deliveryName: 'Demo Customer',
  deliveryAddress: '123 Demo Street, Springfield, 12345',
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  /**
   * Temporary order used for the confirmation and tracking UI.
   * Replace with verified Order Service integration in M8.
   */
  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = orderId === MOCK_ORDER.id ? MOCK_ORDER : undefined;
    return of(order).pipe(delay(150));
  }
}
