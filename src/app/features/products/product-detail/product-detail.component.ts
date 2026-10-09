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
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
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
        map((params) => this.parseProductId(params.get('id'))),
        distinctUntilChanged(),
        switchMap((id) => this.loadProduct(id)),
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

  private parseProductId(value: string | null): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private loadProduct(id: number | null) {
    this.resetState(id === null);

    return id === null
      ? of(undefined)
      : this.productService.getProductById(id);
  }

  private resetState(isInvalidId: boolean): void {
    this.product.set(null);
    this.notFound.set(isInvalidId);
    this.errorMessage.set(null);
    this.isLoading.set(true);
  }
}
