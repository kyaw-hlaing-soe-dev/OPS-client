# Ecommerce Client Project Documentation

## Project overview

`ecommerce-client` is an Angular frontend for an Order Processing System
(OPS). It is intended to provide a customer-facing storefront with product,
cart, checkout, and order areas.

The current repository is an early application shell with a mock product-list
flow. Current implementation status and verification results are maintained in
[PROJECT_STATUS.md](PROJECT_STATUS.md).

Backend integration is intentionally deferred. The implemented frontend uses
typed mock data and local in-memory state until the Order Service contract is
provided.

The intended system boundary is:

```

Displayed prices use the Myanmar kyat currency code (`MMK`). The current
numeric values are mock catalog values and are not connected to a live
backend currency contract.text
Angular frontend -> Order Service -> Fake Payment Gateway
```

The Angular application must communicate with the Order Service only. It must
not call the fake payment gateway directly.

## Current scope and behavior

### Application shell

The root application renders:

- A shared navigation bar
- The active route inside a router outlet
- A footer

The root component is defined in
[src/app/app.ts](../src/app/app.ts), with its template in
[src/app/app.html](../src/app/app.html).

### Current routes

Routes are defined in
[src/app/app.routes.ts](../src/app/app.routes.ts) and use lazy-loaded standalone
components:

| Path | Current component | Current behavior |
|---|---|---|
| `/` | Product list | Displays a typed in-memory mock product catalog |
| `/products/:id` | Product detail | Displays a product from the typed in-memory mock catalog, or a not-found state |
| `/cart` | Cart page | Displays in-memory cart items, quantities, totals, and an empty state |
| `/checkout` | Checkout page | Validates delivery details and reviews the in-memory cart |
| `/orders/:orderId/success` | Order confirmation | Displays a clearly labeled mock confirmation |
| `/orders/:orderId` | Order detail | Displays mock order items, total, delivery, and status tracking |

Unknown URLs are handled by a lazy-loaded not-found component with a link back
to the product list.

### Current service behavior

The following root-provided services exist:

- [ProductService](../src/app/core/services/product.service.ts), which returns
  a typed in-memory mock catalog for the product-list milestone
- [CartService](../src/app/core/services/cart.service.ts), which manages the
  in-memory cart state for the cart milestone
- [OrderService](../src/app/core/services/order.service.ts), which currently
  returns one clearly labeled mock order for the confirmation and tracking UI

The functional HTTP interceptor in
[src/app/core/interceptors/http-interceptor.ts](../src/app/core/interceptors/http-interceptor.ts)
is currently a pass-through interceptor and is not registered in the
application providers.

## Architecture and directory map

The project uses Angular standalone components and a feature-based structure.

```text
ecommerce-client/
  angular.json                  Angular CLI project/build configuration
  package.json                  Dependencies and npm scripts
  README.md                     Project entry point
  AGENT.md                      Canonical project agent instructions
  AGENTS.md                     Pointer to AGENT.md
  docs/                         Project and agent documentation
  public/                       Assets configured by angular.json
  src/
    assets/config.json          Runtime URL candidate; not currently wired
    main.ts                     Application bootstrap
    styles.scss                 Global styles
    app/
      app.config.ts             Root providers
      app.routes.ts             Application routes
      app.ts                    Root standalone component
      core/                     Shared models, services, HTTP infrastructure
      features/                 Products, cart, checkout, and orders
      shared/components/        Reusable loading/error UI
      shared/layout/            Application layout, including navbar
  tsconfig*.json                TypeScript and Angular compiler settings
```

### Core models

The current interfaces are:

- `Product`: product identity, SKU, description, price, stock, and image URL
- `CartItem`: a product and quantity
- `OrderItem`: product, pricing, quantity, and subtotal fields
- `Order`: order identity, number, status, total, currency, and creation time

These interfaces are currently not connected to API calls or feature
templates.

## Technology stack

Versions below are based on the installed dependency tree observed in the
repository:

- Angular runtime packages: 22.2.1
- Angular CLI/build packages: 22.2.2
- TypeScript: 6.0.3 installed
- RxJS: 7.8.2 installed
- SCSS for component and global styles
- Angular Router
- Angular Forms dependency is present, but no form is implemented yet
- Prettier is present as a development dependency

The project uses standalone bootstrapping through
[src/main.ts](../src/main.ts) and providers in
[src/app/app.config.ts](../src/app/app.config.ts).

## Local setup and development

### Prerequisites

The repository declares npm 11.12.1 as its package manager in
[package.json](../package.json). Use a compatible Node.js installation and
npm version.

### Install dependencies

From the repository root:

```powershell
npm install
```

### Start the development server

```powershell
npm start
```

The configured development URL is:

```text
http://localhost:4200
```

### Continuous development build

```powershell
npm run watch
```

This runs the development Angular build in watch mode.

### Direct Angular CLI usage

The `ng` script is available through npm:

```powershell
npm run ng -- version
```

## Configuration and backend integration

### Application providers

[src/app/app.config.ts](../src/app/app.config.ts) currently provides:

- Browser global error listeners
- Angular `HttpClient`
- Angular Router

No API base URL provider, authentication provider, or interceptor registration
is currently configured.

### Runtime configuration

[src/assets/config.json](../src/assets/config.json) currently contains:

```json
{
  "apiUrl": "http://localhost:8086/QMS/"
}
```

This value is not currently loaded by application code. In addition,
[angular.json](../angular.json) currently configures `public/` as an asset
source but does not configure `src/assets/` as a build asset.

For the API contract, URL conflict, and configuration gaps, see
[API-CONTRACT.md](API-CONTRACT.md) and
[DECISIONS_AND_GAPS.md](agents/DECISIONS_AND_GAPS.md).

## Build and deployment notes

### Production build

Run:

```powershell
npm run build
```

The Angular production build is configured as the default build configuration
in [angular.json](../angular.json). Its output directory is:

```text
dist/ecommerce-client
```

The production configuration enables output hashing and defines budgets for:

- Initial bundle: warning at 500 kB, error at 1 MB
- Individual component styles: warning at 4 kB, error at 8 kB

The intended server is Tomcat, based on project-owner direction. The
repository does not contain a Tomcat deployment descriptor, context
configuration, CI workflow, or deployment script. Hosting the contents of
`dist/ecommerce-client` on Tomcat will require a decision about the SPA base
path and fallback routing.

## Testing and current coverage

See [TESTING.md](agents/TESTING.md) and
[PROJECT_STATUS.md](PROJECT_STATUS.md) for the current test setup and dated
verification results.

## Security and contribution notes

### Security boundaries

- Do not commit secrets, credentials, or private tokens.
- Do not store fake-payment-gateway URLs in the Angular application.
- Do not call the fake payment gateway directly.
- Keep backend communication behind typed Angular services.
- Verify API contracts before implementing HTTP calls.
- Treat `src/assets/config.json` as public frontend configuration; it is not a
  secure secret store.

### Contribution guidance

Contribution workflow, coding conventions, milestone rules, and Git safety
requirements are maintained in [AGENT.md](../AGENT.md) and
[AGENTS.md](../AGENTS.md). Read those files before making changes rather than
duplicating their instructions here.

## Troubleshooting

### `npm install` fails

Confirm that Node.js and npm are installed and that the npm version is
compatible with the package manager version declared in `package.json`. Re-run
the command from the repository root containing `package.json`.

### `npm start` cannot find the project

Run the command from:

```text
C:\Users\Lenovo\Desktop\OPS\ecommerce-client
```

Also confirm that dependencies have been installed.

### The browser shows only placeholder pages

The product-list, cart, checkout, and order routes currently use frontend
state or clearly labeled mock data; they are not live backend data.

### API requests do not work

No application API requests are currently implemented. Before adding them,
verify the Order Service Swagger/OpenAPI contract and resolve the mismatch
between the README URL and `src/assets/config.json`.

### `npm test` fails with a target error

The current Angular workspace has no configured test target. This must be
configured in a future testing/foundation change before unit tests can run.

### `src/assets/config.json` is unavailable after a build

The current `angular.json` asset configuration includes `public/`, not
`src/assets/`. This is a known configuration gap. Do not assume runtime
configuration is available in `dist/` until the asset strategy is deliberately
implemented and verified.

## Known gaps and owner decisions

The following items are intentionally not guessed:

1. The authoritative Order Service base URL.
2. The Order Service Swagger/OpenAPI contract.
3. Whether `src/assets/config.json` should be included as a build asset or
   replaced by another supported configuration mechanism.
4. The production hosting and deployment process.
5. The supported Angular test runner and test target configuration.
6. The behavior and data contract for the currently scaffolded feature pages.
