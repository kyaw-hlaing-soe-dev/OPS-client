# AGENT.md --- Order Processing System Frontend

## Purpose

Project-specific durable instructions for coding agents. Read this file at
the start of every task and follow it. Changing project facts and milestone
status belong in [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).

## Working agreement

- Use the loop: inspect -> plan -> implement -> verify -> repair -> review
  -> update this file -> report.
- Work on one approved milestone at a time. Stop and wait for approval
  after each milestone.
- Explain important changes in beginner-friendly language.
- Inspect `git status` before editing and preserve uncommitted user
  changes.
- Do not commit or push without explicit approval.
- Never run destructive Git commands or discard user work without
  explicit approval.
- Report command results truthfully; do not claim a check passed
  unless it actually passed.
- Limit repairs to three focused attempts per milestone, then report
  blockers.

## Architecture constraints

- Inspect the actual repository and installed Angular version before
  making assumptions.
- Preserve standalone components, feature-based organization, and lazy
  routes unless a concrete problem justifies a change.
- Keep UI concerns in components and reusable data/business logic in
  services.
- Prefer strict typing; avoid `any` unless justified.
- Avoid unnecessary libraries, NgRx, and abstractions without a
  demonstrated need.
- Use accessible semantic HTML, keyboard-friendly controls, and
  responsive layouts.
- Handle loading, error, empty, success, and validation states where
  relevant.

## Backend boundary and API correctness

- System boundary: Angular frontend -> `order-service` ->
  `fake-payment-gateway`.
- Angular must never call `fake-payment-gateway` directly.
- Never invent endpoints, payloads, response shapes, authentication
  rules, or payment behavior.
- Verify API contracts from authoritative backend source or
  documentation before HTTP integration.
- If contracts are unavailable, use clearly labeled mock data behind
  typed services and record the blocker.
- Never describe mock data as live backend integration.
- Never expose secrets or credentials in frontend code.

## Per-milestone process

1. Read this file and all applicable repository instructions.
2. Inspect Git status, relevant code, package scripts, configuration,
   and dependencies.
3. Present a focused plan and acceptance criteria.
4. Implement only the approved milestone.
5. Run appropriate build/tests/lint/type checks based on actual scripts
   and configuration.
6. Diagnose and repair failures, up to three focused attempts.
7. Review the full diff for regressions, accidental deletions, security
   issues, and unnecessary changes.
8. Update this file with verified findings, decisions, commands,
   status, and blockers.
9. Report changed files, actual check results, manual verification
   steps, limitations, and next milestone.
10. Stop and wait for approval.

## Git and dependency safety

- Do not reset, clean, force-push, or overwrite user changes.
- Do not commit or push unless explicitly approved.
- Explain substantial dependency additions and ask approval when
  appropriate.
- Do not weaken or disable tests to make checks pass.

## Current project status

See [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) for the current
milestone, verified versions and checks, roadmap, and blockers.

## Senior frontend audit status

Audit phase: Phase 1 inspection and approved frontend improvements completed
on 2026-10-12. The required `AGENTIC_FRONTEND_BUILD_PROMPT.md` file was not
present anywhere under the workspace, so the audit and fixes followed this
file and the repository documentation instead.

Verified findings:

- `npm run build` passes and emits the production bundle, but reports component
  style budget warnings for
  `src/app/features/products/product-list/product-list.component.scss` and
  `src/app/shared/components/navbar/navbar.component.scss`.
- `npm test` now passes through the Angular Vitest target with five focused
  tests covering cart behavior and MMK formatting.
- The deployed site at `https://ops-client-orcin.vercel.app/` loads the
  storefront and product-not-found route. The local fixed build was verified
  at 390px and 740px with no horizontal document overflow.
- Product and order data are still typed in-memory mocks. Checkout only waits
  300ms and displays a frontend-demo message; it does not create an order.
- `provideHttpClient()` is configured, but the pass-through interceptor is not
  registered and no service currently performs an HTTP request.
- Backend configuration is inconsistent: `src/assets/config.json` contains
  `http://localhost:8086/QMS/`, while environment files contain
  `http://localhost:8080/api/v1`. Neither value is currently used by the
  product, checkout, or order services.
- The deployed browser inspection showed external Unsplash images and Google
  Fonts loading successfully during the audit. Their third-party availability
  remains a deployment/performance dependency.

Prioritized audit roadmap:

Completed improvements:

- Contained directional reveal transforms while preserving left/right motion.
- Added the Angular Vitest test target and focused cart/MMK tests.
- Added Escape-key and dialog semantics for search/mobile navigation overlays.
- Relabeled non-functional storefront links as demo links or connected them to
  the real catalog anchor.
- Moved shared reveal and visually-hidden styles to the global stylesheet,
  reducing component stylesheet duplication.

Remaining roadmap:

1. Resolve and document the authoritative Order Service contract and base URL
   before replacing mock services with HTTP requests.
2. Add API-backed checkout and order ownership only after the verified contract
   is available.
3. Continue reducing or explicitly justify the remaining component-style
   budget warnings and review external asset hosting.

The API configuration milestone remains blocked because the repository still
has conflicting candidate URLs and no authoritative Swagger/OpenAPI contract.
