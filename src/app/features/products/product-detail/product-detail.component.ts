import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent, RouterLink],
  template: `
    <section class="page-shell" aria-labelledby="product-detail-title">
      @if (isLoading()) {
        <app-loading />
      } @else if (errorMessage()) {
        <div class="message message--error" role="alert">
          {{ errorMessage() }}
        </div>
        <a routerLink="/">Return to products</a>
      } @else if (notFound()) {
        <div class="message" role="status">
          <h1 id="product-detail-title">Product not found</h1>
          <p>We could not find the product you requested.</p>
        </div>
        <a routerLink="/">Return to products</a>
      } @else if (product(); as selectedProduct) {
        <a class="back-link" routerLink="/">Back to products</a>
        <article class="product-detail">
          <img
            [src]="selectedProduct.imageUrl"
            [alt]="selectedProduct.name"
          />
          <div class="product-detail__content">
            <p class="sku">{{ selectedProduct.sku }}</p>
            <h1 id="product-detail-title">{{ selectedProduct.name }}</h1>
            <p class="description">{{ selectedProduct.description }}</p>
            <p class="price">{{ selectedProduct.price | currency }}</p>
            <p>
              <strong>Available stock:</strong>
              {{ selectedProduct.stock }}
            </p>
          </div>
        </article>
      }
    </section>
  `,
  styles: `
    .back-link {
      display: inline-block;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
      font-weight: 600;
    }

    .product-detail {
      display: grid;
      gap: 2rem;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
    }

    .product-detail img {
      width: 100%;
      border-radius: 12px;
    }

    .product-detail__content {
      padding: 1rem 0;
    }

    .sku {
      color: var(--color-text-muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .description {
      color: var(--color-text-muted);
      font-size: 1.1rem;
    }

    .price {
      font-size: 1.75rem;
      font-weight: 700;
    }

    .message {
      margin-bottom: 1rem;
    }

    .message--error {
      color: #b91c1c;
    }

    @media (max-width: 700px) {
      .product-detail {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  readonly product = signal<Product | null>(null);
  readonly isLoading = signal(true);
  readonly notFound = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        distinctUntilChanged(),
        switchMap((id) => {
          this.product.set(null);
          this.notFound.set(!Number.isInteger(id) || id < 1);
          this.errorMessage.set(null);
          this.isLoading.set(true);

          if (!Number.isInteger(id) || id < 1) {
            return of(undefined);
          }

          return this.productService.getProductById(id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (product) => {
          this.product.set(product ?? null);
          this.notFound.set(!product);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load this product.');
          this.isLoading.set(false);
          this.notFound.set(false);
        },
      });
  }
}
