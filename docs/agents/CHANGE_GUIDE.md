# Change Guide

These procedures describe changes supported by the current structure. Confirm
the relevant milestone in [AGENT.md](../../AGENT.md) before editing.

## Add a feature page

1. Create a folder under the relevant feature, such as
   `src/app/features/products/product-list/`.
2. Add a standalone component with a descriptive kebab-case filename.
3. Keep the component focused on rendering and user interaction.
4. Add a `loadComponent` route in `src/app/app.routes.ts`.
5. Add loading, error, empty, and success states when data is involved.
6. Run `npm run build`.

## Add a shared component

1. Confirm the component is genuinely reused across features.
2. Put reusable UI in `src/app/shared/components/`.
3. Put application shell/layout UI in `src/app/shared/layout/`.
4. Keep inputs and outputs typed.
5. Preserve semantic and keyboard-accessible markup.

## Add a service

1. Place cross-feature services in `src/app/core/services/`.
2. Use `@Injectable({ providedIn: 'root' })` when application-wide lifetime
   is appropriate.
3. Keep business and data access out of page templates.
4. Use `HttpClient` only after verifying the Order Service contract.
5. Do not call or configure the fake payment gateway.
6. Add focused tests once a test target is configured.

## Add or change a model

1. Place shared domain interfaces in `src/app/core/models/`.
2. Use fields verified by the backend contract or by clearly labeled mock data.
3. Avoid broad `string` types when the real finite values are known.
4. Separate transport DTOs from UI models only when their shapes differ.

## Add a backend request

Do not add one until the authoritative Swagger/OpenAPI contract is available.
Record the base URL, method, path, request shape, response shape, statuses, and
error shape in the project documentation first. Then implement the request in
the appropriate typed service and test it with the verified contract.
