import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, ErrorMessageComponent, LoadingComponent, RouterLink],
  template: `
    <section class="page-shell" aria-labelledby="products-title">
      <header class="page-header">
        <p class="eyebrow">Mock catalog</p>
        <h1 id="products-title">Products</h1>
        <p>Browse our current product selection.</p>
      </header>

      @if (isLoading()) {
        <app-loading />
      } @else if (errorMessage()) {
        <app-error-message />
      } @else if (products().length === 0) {
        <p class="empty-state">No products are available right now.</p>
      } @else {
        <div class="product-grid">
          @for (product of products(); track product.id) {
            <article class="product-card">
              <img [src]="product.imageUrl" [alt]="product.name" />
              <div class="product-card__body">
                <p class="product-card__sku">{{ product.sku }}</p>
                <h2>{{ product.name }}</h2>
                <p>{{ product.description }}</p>
                <div class="product-card__footer">
                  <strong>{{ product.price | currency }}</strong>
                  <a [routerLink]="['/products', product.id]">View details</a>
                </div>
              </div>
            </article>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .page-header {
      margin-bottom: 2rem;
    }

    .eyebrow,
    .product-card__sku {
      color: var(--color-text-muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .page-header p:last-child {
      margin: 0;
    }

    .product-grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .product-card {
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      background: var(--color-surface);
    }

    .product-card img {
      aspect-ratio: 3 / 2;
      width: 100%;
      object-fit: cover;
    }

    .product-card__body {
      display: flex;
      min-height: 210px;
      flex-direction: column;
      padding: 1.25rem;
    }

    .product-card__body h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
    }

    .product-card__body p {
      color: var(--color-text-muted);
    }

    .product-card__sku {
      margin: 0 0 0.75rem;
    }

    .product-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
    }

    .product-card__footer a {
      color: var(--color-primary);
      font-weight: 600;
    }

    .empty-state {
      color: var(--color-text-muted);
    }
  `,
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  readonly products = signal<readonly Product[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load products.');
          this.isLoading.set(false);
        },
      });
  }
}
