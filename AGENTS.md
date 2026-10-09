# Repository Guidelines

Read [AGENT.md](AGENT.md) first for the required milestone workflow, current
status, backend boundary, and safety rules. Keep both instruction files
consistent when project rules change.

## Project Structure & Module Organization

This repository is an Angular 22 customer-facing e-commerce client. Application bootstrap and global styles are in `src/main.ts` and `src/styles.scss`; routes and root app files are in `src/app`. Organize feature screens under `src/app/features` (products, cart, checkout, and orders), reusable UI under `src/app/shared/components`, application layout under `src/app/shared/layout`, and cross-feature models, services, and interceptors under `src/app/core`. Static files belong in `public`; runtime configuration and other app assets belong in `src/assets`.

## Build, Test, and Development Commands

- `npm install` installs dependencies.
- `npm start` runs the Angular development server at `http://localhost:4200`.
- `npm run build` creates a production build in `dist/`.
- `npm run watch` rebuilds continuously using the development configuration.
- `npm test` is intended to run Angular's test target, but the current workspace has no configured test target. Add a supported target before relying on it.

The client must call only the Order Service. The Order Service calls the fake payment gateway; Angular must never call that gateway directly. The authoritative API contract and endpoint paths are not yet available. Do not invent them. The current runtime URL is documented in `src/assets/config.json` and must be verified against the backend contract before HTTP integration.

## Milestone Workflow

Work one approved milestone at a time:

1. Inspect the relevant files and current git status.
2. State a bounded plan and acceptance criteria.
3. Implement the smallest coherent change.
4. Run the build, tests, and relevant static checks.
5. Repair failures only when they are caused by the milestone.
6. Review the diff for regressions and unrelated changes.
7. Report actual results and stop for approval before the next milestone.

Do not implement later milestones early. Preserve user changes and do not reset, clean, force-push, or automatically commit.

## Coding Style & Naming Conventions

Use two spaces, UTF-8, and final newlines. TypeScript uses single quotes; Prettier is configured for a 100-character print width and Angular HTML templates. Use Angular's `app` selector prefix and descriptive kebab-case filenames such as `product-list.component.ts`. Keep feature-specific code within its feature folder and shared code in `shared` or `core` according to its role.

## Testing Guidelines

The project provides `ng test` through `npm test`, but currently has no checked-in test files and no coverage threshold. Name future specs alongside their implementation using Angular's `*.spec.ts` convention, and cover behavior when adding or changing it.

## Commit & Pull Request Guidelines

Recent commits use short, direct subjects; several follow `type: imperative summary` (for example, `refactor: move navbar into shared layout`). Use that pattern when appropriate and keep each commit focused. Pull requests should explain the user-visible or structural change, link related issues when available, and include screenshots for visual changes. Mention relevant build or test commands and their results.

## Security & Configuration Tips

Keep environment-specific URLs and secrets out of committed source. Review `src/assets/config.json` and the HTTP interceptor when changing service configuration or request behavior; never commit credentials. Keep API access behind typed services and use Angular `HttpClient`; never add fake-payment-gateway URLs to the frontend.

## Current Baseline

See [docs/MILESTONE-0-BASELINE.md](docs/MILESTONE-0-BASELINE.md) for the inspected architecture, validation results, and known blockers. See [docs/API-CONTRACT.md](docs/API-CONTRACT.md) for the exact backend information required before API integration.
