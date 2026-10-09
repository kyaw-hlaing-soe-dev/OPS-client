# Architecture

## Entry points

- [src/main.ts](../../src/main.ts) calls `bootstrapApplication`.
- [src/app/app.config.ts](../../src/app/app.config.ts) provides browser error
  listeners, `HttpClient`, and the Router.
- [src/app/app.ts](../../src/app/app.ts) renders the navbar, router outlet, and
  application shell.

## Routing

Routes are in [src/app/app.routes.ts](../../src/app/app.routes.ts). Each
feature page is loaded with `loadComponent`, so route components are lazy
loaded.

Current routes are `/`, `/products/:id`, `/cart`, `/checkout`,
`/orders/:orderId/success`, and `/orders/:orderId`. A wildcard route lazy-loads
the not-found component for unknown URLs.

## Services and models

`src/app/core/services/` contains root-provided `ProductService`,
`ProductService`, `CartService`, and `OrderService` are root-provided services.
`ProductService` currently provides the typed in-memory catalog used by the
product list and product detail pages; cart and order services remain
placeholders.

`src/app/core/models/` contains interfaces for products, cart items, order
items, and orders. These models are not yet connected to implemented API
requests.

## Backend communication and runtime configuration

The intended boundary is Angular -> Order Service -> fake payment gateway.
Angular must never call the fake payment gateway. API and configuration
uncertainties are maintained in
[DECISIONS_AND_GAPS.md](DECISIONS_AND_GAPS.md) and
[API-CONTRACT.md](../API-CONTRACT.md).
