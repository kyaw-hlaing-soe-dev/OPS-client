import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';
import { MmkPipe } from '../../../shared/pipes/mmk.pipe';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MmkPipe, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  readonly cartService = inject(CartService);

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);

    if (Number.isInteger(quantity)) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }
}
