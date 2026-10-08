import { Component } from '@angular/core';

@Component({
  selector: 'app-order-success',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>Order Success</h1>
      <p>Your order has been placed successfully.</p>
    </section>
  `,
})
export class OrderSuccessComponent {}
