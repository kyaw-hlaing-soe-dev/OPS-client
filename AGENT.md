# AGENT.md --- Order Processing System Frontend

## Purpose

Project-specific instructions for coding agents. Read this file at the
start of every task and follow it. Update it whenever a task establishes
verified project facts, changes conventions, or changes milestone
status.

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

## Milestone roadmap

- M0: baseline inspection and safe checks only; no feature
  implementation.
- M1: frontend foundation and application shell.
- M2: product listing.
- M3: product details.
- M4: cart and cart tests.
- M5: checkout form and submission UI.
- M6: order confirmation and tracking.
- M7: tests, accessibility, responsiveness, and error handling.
- M8: backend integration after verifying API contracts.

## Project facts and status

- Current status: M0 baseline inspection is complete.
- Angular runtime packages: 22.2.1; CLI/build packages: 22.2.2.
- TypeScript installed version: 6.0.3.
- `npm run build`: passes and writes to `dist/ecommerce-client`.
- `npm test`: fails before execution because no Angular test target is
  configured.
- No application `*.spec.ts` files or lint target currently exist.
- Runtime API configuration is in `src/assets/config.json`, but its
  endpoint contract is unverified.
- Verified blocker: the Order Service Swagger/OpenAPI contract and
  authoritative API base URL are unavailable.
- Current milestone: M0 complete.
- Next step: obtain approval for M1, then implement only the frontend
  foundation and application shell.

See `docs/MILESTONE-0-BASELINE.md` for baseline evidence and
`docs/API-CONTRACT.md` for the exact API information required before
HTTP integration.
