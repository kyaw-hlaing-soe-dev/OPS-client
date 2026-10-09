# Milestone 0: Baseline Inspection

Date: 2026-10-08

## Scope

This milestone inspected the existing Angular project and recorded its health. It did not implement product, cart, checkout, order, or API features.

## Project baseline

- Angular: 22.2.1 runtime packages; CLI/build 22.2.2
- TypeScript: 6.0.3 installed
- RxJS: 7.8.2 installed
- Architecture: standalone components with feature-based folders
- Routing: lazy-loaded standalone feature components
- Application folders:
  - `src/app/core`: models, services, and interceptor
  - `src/app/features`: products, cart, checkout, and orders
  - `src/app/shared/components`: reusable loading and error UI
  - `src/app/shared/layout`: application navbar layout

## Findings

- Product, cart, checkout, and order pages are currently scaffold components.
- `ProductService`, `CartService`, and `OrderService` are placeholders.
- The interceptor is a no-op and is not registered.
- No `*.spec.ts` files currently exist.
- No lint script is configured.
- The Order Service Swagger/OpenAPI contract was not available in the workspace or at the probed local URLs.
- The runtime API URL is present in `src/assets/config.json`, but its endpoint contract is unverified.

## Commands and actual results

### Production build

Command:

```text
npm run build
```

Result: passed. Angular generated the production bundle in `dist/ecommerce-client`.

### Unit tests

Command:

```text
npm test
```

Result: failed before test execution:

```text
Cannot determine project or target for command.
```

The workspace has no configured Angular test target and no application spec files.

### Lint

Result: not run. No lint script or lint target is configured.

## Acceptance status

- Existing architecture inspected: complete
- Git status inspected before changes: complete
- Baseline build recorded: complete
- Baseline test result recorded: complete
- API contract verified: blocked
- Later milestone implementation: intentionally not started

## Next step

Approve Milestone 1 only after deciding whether to configure the test target as part of the foundation milestone. API integration remains blocked until the Order Service Swagger/OpenAPI contract is available.
