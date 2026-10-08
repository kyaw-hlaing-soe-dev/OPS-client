import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout-page/checkout-page.component').then(
        (m) => m.CheckoutPageComponent,
      ),
  },
  {
    path: 'orders/:orderId/success',
    loadComponent: () =>
      import('./features/orders/order-success/order-success.component').then(
        (m) => m.OrderSuccessComponent,
      ),
  },
  {
    path: 'orders/:orderId',
    loadComponent: () =>
      import('./features/orders/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent,
      ),
  },
];
