# Project Map

## Top-level locations

| Path | Responsibility |
|---|---|
| `src/main.ts` | Bootstraps the standalone Angular application |
| `src/app/` | Application code |
| `src/styles.scss` | Global styles |
| `public/` | Assets configured by `angular.json` |
| `src/assets/` | Contains runtime configuration candidate; not currently configured as a build asset |
| `docs/` | Project and agent documentation |
| `package.json` | Dependencies and npm scripts |
| `angular.json` | Angular build and serve configuration |

## Application map

```text
src/app/
  app.config.ts
  app.routes.ts
  app.ts
  core/
    interceptors/
    models/
    services/
  features/
    products/
    cart/
    checkout/
    orders/
  shared/
    components/
    layout/
```

## Where to make common changes

- Add or change a route: `src/app/app.routes.ts`
- Change root providers: `src/app/app.config.ts`
- Change the application shell: `src/app/app.ts`, `app.html`, or `app.scss`
- Add a product screen: `src/app/features/products/`
- Add cart behavior: `src/app/core/services/cart.service.ts` and
  `src/app/features/cart/`
- Add order behavior: `src/app/core/services/order.service.ts` and
  `src/app/features/orders/`
- Add shared loading/error UI: `src/app/shared/components/`
- Change navigation layout: `src/app/shared/layout/navbar/`
- Add shared domain types: `src/app/core/models/`
- Change HTTP infrastructure: `src/app/core/interceptors/`
- Change global styling: `src/styles.scss`

Current implementation status is maintained in
[PROJECT_STATUS.md](../PROJECT_STATUS.md). Do not assume that a folder implies
implemented behavior.
