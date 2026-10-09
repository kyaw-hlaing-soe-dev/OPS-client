import { Injectable } from '@angular/core';
import { computed, signal } from '@angular/core';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<readonly CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly itemCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0),
  );
  readonly total = computed(() =>
    this.items().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  );

  addItem(product: Product): void {
    const existingItem = this.items().find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
      return;
    }

    this.items.update((items) => [...items, { product, quantity: 1 }]);
  }

  removeItem(productId: number): void {
    this.items.update((items) =>
      items.filter((item) => item.product.id !== productId),
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item,
      ),
    );
  }
}
