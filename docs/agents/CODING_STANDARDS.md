# Coding Standards

These conventions are based on the current repository files. Follow
[AGENTS.md](../../AGENTS.md) for broader contribution rules.

## TypeScript and Angular

- Use standalone components.
- Use the `app` selector prefix.
- Keep feature-specific code under its feature folder.
- Keep cross-feature services and models under `src/app/core`.
- Keep reusable UI under `src/app/shared/components`.
- Keep application layout under `src/app/shared/layout`.
- Prefer strict, explicit types and avoid `any`.
- Use Angular dependency injection and `HttpClient` patterns.
- Keep business/data logic in services and display logic in components.

## Naming and file layout

Use descriptive kebab-case names:

```text
product-list.component.ts
product.service.ts
cart-item.model.ts
```

Group a component's TypeScript, template, and SCSS files together when the
component uses external files.

## Formatting

- Use two-space indentation.
- Use single quotes in TypeScript.
- Keep final newlines.
- Use SCSS for component styles.
- Prettier is listed as a development dependency; no formatting script is
  configured.

## Templates and UX

- Prefer semantic HTML.
- Keep interactive controls keyboard accessible.
- Account for loading, error, empty, success, and validation states where a
  feature needs them.
- Preserve the existing responsive styling approach unless a concrete issue
  requires change.
