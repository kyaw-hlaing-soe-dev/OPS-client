# Review Checklist

## Scope

- [ ] Only the approved milestone was implemented.
- [ ] Existing user changes were preserved.
- [ ] No unrelated files or dependencies were changed.

## Correctness

- [ ] Routes and lazy imports point to existing components.
- [ ] Types match the verified contract or are clearly labeled mock types.
- [ ] Loading, empty, error, success, and validation states are handled where
      relevant.
- [ ] Failures are surfaced instead of silently converted into success.

## Accessibility and UX

- [ ] Semantic HTML is used.
- [ ] Interactive controls are keyboard accessible.
- [ ] Form errors are associated with their fields where forms exist.
- [ ] Layout remains usable at narrow widths.

## Security and configuration

- [ ] No secrets or credentials were added.
- [ ] Angular does not call the fake payment gateway.
- [ ] API paths and payloads were not invented.
- [ ] Public configuration is not treated as a secret store.

## Verification

- [ ] Relevant diagnostics were checked.
- [ ] `npm run build` was run when source code changed.
- [ ] Tests were run if a supported target exists.
- [ ] Missing checks are explicitly reported.
- [ ] The final diff was reviewed.
