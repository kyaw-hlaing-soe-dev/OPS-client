import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>Shopping Cart</h1>
      <p>Your cart is currently empty.</p>
    </section>
  `,
})
export class CartPageComponent {}
