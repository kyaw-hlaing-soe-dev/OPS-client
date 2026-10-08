import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>Products</h1>
      <p>Browse our products.</p>
    </section>
  `,
})
export class ProductListComponent {}
