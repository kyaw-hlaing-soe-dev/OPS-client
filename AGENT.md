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

Audit phase: Phase 1 inspection complete on 2026-10-12. Application code was
not changed. The required `AGENTIC_FRONTEND_BUILD_PROMPT.md` file was not
present anywhere under the workspace, so the audit followed this file and the
repository documentation instead.

Verified findings:

- `npm run build` passes and emits the production bundle, but reports component
  style budget warnings for
  `src/app/features/products/product-list/product-list.component.scss` and
  `src/app/shared/components/navbar/navbar.component.scss`.
- `npm test` fails before test execution because no Angular test project or
  target is configured. No checked-in `*.spec.ts` files were found.
- The deployed site at `https://ops-client-orcin.vercel.app/` loads the
  storefront and product-not-found route. Browser inspection at 390px and
  740px confirmed horizontal document overflow.
- The overflow is consistent with the directional reveal transforms in
  `src/app/features/products/product-list/product-list.component.scss`
  (`translateX(-42px)` and `translateX(42px)`) applied to page-edge sections.
  The deployed document measured 402px at a 390px viewport and 751px at a
  740px viewport.
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

1. Fix responsive overflow without removing the intended directional motion;
   verify at 390px, 740px, and desktop widths.
2. Add a supported Angular test target and focused tests for cart quantities,
   totals, product not-found behavior, and checkout validation.
3. Resolve and document the authoritative Order Service contract and base URL
   before replacing mock services with HTTP requests.
4. Reduce or justify component-style budget warnings and review external asset
   loading strategy.

Application-code fixes are blocked until the project owner approves a specific
improvement milestone.
