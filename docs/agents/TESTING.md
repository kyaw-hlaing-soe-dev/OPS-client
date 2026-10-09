# Testing

## Current setup

The command and coverage status is maintained in
[PROJECT_STATUS.md](../PROJECT_STATUS.md). In particular, do not claim test
or lint coverage until the repository has a configured target and checked-in
specifications.

## Test placement and naming

When a supported test target is added, place focused specs beside the code they
test and use the Angular convention:

```text
product.service.spec.ts
cart.service.spec.ts
checkout-page.component.spec.ts
```

Do not claim coverage until the test runner and target are configured.

## Practical coverage priorities

When behavior is implemented, prioritize:

1. Cart additions, removals, quantity limits, and totals
2. Product and order service request/response handling
3. Checkout validation and submission states
4. Loading, empty, error, success, and not-found states
5. Route parameter handling

Use the actual backend contract for HTTP expectations. Until then, use clearly
labeled typed mocks rather than invented endpoints.
