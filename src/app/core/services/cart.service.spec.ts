import { describe, expect, it } from 'vitest';

import { Product } from '../models/product.model';
import { CartService } from './cart.service';

const product: Product = {
  id: 1,
  name: 'Test product',
  sku: 'TEST-001',
  description: 'Test product description',
  price: 1250,
  stock: 3,
  imageUrl: '/test-product.jpg',
  category: 'Test',
};

describe('CartService', () => {
  it('adds items and calculates the MMK total', () => {
    const service = new CartService();

    service.addItem(product, 2);

    expect(service.itemCount()).toBe(2);
    expect(service.total()).toBe(2500);
  });

  it('caps quantities at the available stock', () => {
    const service = new CartService();

    service.addItem(product);
    service.updateQuantity(product.id, 10);

    expect(service.cartItems()[0]?.quantity).toBe(product.stock);
  });

  it('removes an item when its quantity is zero', () => {
    const service = new CartService();

    service.addItem(product);
    service.updateQuantity(product.id, 0);

    expect(service.cartItems()).toHaveLength(0);
  });
});
