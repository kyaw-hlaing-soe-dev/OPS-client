# Project Status

This document is the authoritative source for changing milestone status,
verified tool results, and current blockers. Stable workflow and architecture
rules remain in [AGENT.md](../AGENT.md).

## Status date

2026-10-09

## Current milestone

- M0 baseline inspection: complete
- M1 frontend foundation and application shell: complete
- M2 product listing: complete
- M3 product details: complete
- M4 cart: complete
- M5 checkout: complete
- M6 order confirmation and tracking: complete
- M7 quality and accessibility: complete
- M8 backend integration: intentionally deferred
- Visual storefront redesign: complete
- Product, cart, checkout, order, and live API milestones: not started

## Verified project facts

- Angular runtime packages: 22.2.1
- Angular CLI/build packages: 22.2.2
- TypeScript installed version: 6.0.3
- RxJS installed version: 7.8.2
- Architecture: standalone components with feature-based folders and lazy
  component routes

## Verification results

Results recorded on 2026-10-09 in the Windows development environment:

- `npm run build`: passed after M7 quality changes; output was written to
  `dist/ecommerce-client`
- `npm test`: failed before execution because no Angular test target is
  configured
- Lint: not run because no lint script or target is configured
- Application diagnostics: no errors reported for the M7 source and template
  files
- `git diff --check`: passed for the M7 changes
- Accessibility quality pass: added visible keyboard focus styles, form
  autocomplete, invalid-field associations, current-step semantics, and
  lazy image loading
- Browser smoke test on port 4300: passed for empty-cart protection,
  populated checkout review, required-field validation flow, submitting
  state, and the honest demo acknowledgement
- Visual redesign verification on port 4303: passed for the homepage,
  product detail, cart, checkout, order detail, and not-found routes
- Visual redesign mobile verification at 390px: passed with no horizontal
  overflow; keyboard focus styles and reduced-motion CSS were confirmed
- Visual redesign commit: `6ef55be feat: redesign storefront visuals`

See [MILESTONE-0-BASELINE.md](MILESTONE-0-BASELINE.md) for the baseline
evidence and command output summary.

## Roadmap

- M0: baseline inspection and safe checks only
- M1: frontend foundation and application shell
- M2: product listing
- M3: product details
- M4: cart and cart tests
- M5: checkout form and submission UI
- M6: order confirmation and tracking
- M7: tests, accessibility, responsiveness, and error handling
- M8: backend integration after verifying API contracts
- Visual redesign: complete; preserve current mock behavior while backend
  integration remains deferred

## Current blockers and owner decisions

- Backend integration is intentionally deferred. The Order Service
  Swagger/OpenAPI contract and authoritative base URL remain unavailable.
- `README.md` and `src/assets/config.json` previously documented different
  backend URLs; the repository does not establish which is authoritative.
- `src/assets/config.json` is not currently loaded by application code or
  configured as an Angular build asset.
- The supported test runner and Angular test target have not been selected.
- Deployment hosting, CI, and production environment configuration are not
  defined.
- Product listing currently uses clearly labeled typed mock data. It is not
  connected to the Order Service.
- Product details currently use the same typed mock catalog and are not
  connected to the Order Service.
- Cart state currently lives in memory and is not persisted between full page
  reloads.
- Checkout currently validates delivery details locally only. It does not
  submit an order or communicate with the fake payment gateway.
- Order confirmation and tracking currently use a clearly labeled mock order.
  They are not connected to the Order Service.
- Product, cart, checkout, and order prices are displayed as `MMK` using the
  Angular currency pipe. The numeric values remain mock data.
- Tomcat is the intended server, but no Tomcat configuration or deployment
  script exists in the repository.
- M7 browser smoke testing was not rerun after the final accessibility-only
  changes; production build and diagnostics passed.

See [DECISIONS_AND_GAPS.md](agents/DECISIONS_AND_GAPS.md) for details.
