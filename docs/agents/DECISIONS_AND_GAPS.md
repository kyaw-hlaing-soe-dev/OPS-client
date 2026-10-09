# Decisions and Gaps

This file records facts that are unknown, blocked, or require project-owner
confirmation. Unknown behavior must not be treated as implemented behavior.

## Backend contract

Backend integration is intentionally deferred for the current mock-data
frontend scope. The Order Service Swagger/OpenAPI contract is unavailable.
The following remain unverified:

- Authoritative base URL
- Product list and detail endpoints
- Order creation and detail endpoints
- Request and response DTOs
- Order status values
- Error response format
- Authentication behavior

See [API-CONTRACT.md](../API-CONTRACT.md) for the required contract details.

## Configuration

`src/assets/config.json` contains `http://localhost:8086/QMS/`, while the
README documents `http://localhost:8080`. Application code does not currently
load the JSON file, and `angular.json` does not copy `src/assets/` as a build
asset. The project owner must choose the authoritative URL and configuration
strategy.

## Testing and deployment

The current test and deployment status, including dated command results, is
maintained in [PROJECT_STATUS.md](../PROJECT_STATUS.md).

## Feature behavior

Cart, checkout, and order screens are currently placeholders. Product listing
uses clearly labeled typed in-memory mock data. Final UI behavior, validation
rules, persistence expectations, and API-backed flows require implementation
decisions after the relevant milestone is approved.

## Tomcat deployment

Tomcat is the intended server according to project-owner direction. The
repository does not yet define a Tomcat context path, SPA fallback
configuration, deployment script, or CI process. These details require
confirmation before documenting a repeatable deployment procedure.

## Current architectural decisions

- Preserve standalone Angular components.
- Preserve feature folders for products, cart, checkout, and orders.
- Keep shared UI in `src/app/shared/components` and application layout in
  `src/app/shared/layout`.
- Keep cross-feature services, models, and HTTP infrastructure in
  `src/app/core`.
- Do not add NgRx or another global state library without demonstrated need.
