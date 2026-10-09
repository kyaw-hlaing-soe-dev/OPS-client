import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map, of, switchMap } from 'rxjs';

import { Order, OrderStatus } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

const ORDER_STATUSES: readonly OrderStatus[] = [
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
];

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent, RouterLink],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);

  readonly order = signal<Order | null>(null);
  readonly isLoading = signal(true);
  readonly notFound = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly statuses = ORDER_STATUSES;

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('orderId')),
        distinctUntilChanged(),
        switchMap((orderId) => this.loadOrder(orderId)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (order) => {
          this.order.set(order ?? null);
          this.notFound.set(!order);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load this order.');
          this.isLoading.set(false);
          this.notFound.set(false);
        },
      });
  }

  isStatusComplete(status: OrderStatus, currentStatus: OrderStatus): boolean {
    return (
      this.statuses.indexOf(status) <= this.statuses.indexOf(currentStatus)
    );
  }

  private loadOrder(orderId: string | null) {
    this.order.set(null);
    this.notFound.set(!orderId);
    this.errorMessage.set(null);
    this.isLoading.set(true);

    return orderId ? this.orderService.getOrderById(orderId) : of(undefined);
  }
}
