# Agentic Development Workflow

Work on one approved milestone at a time. Follow this loop:

## 1. Inspect

- Read [AGENT.md](../../AGENT.md) and [AGENTS.md](../../AGENTS.md).
- Run `git status --short` and preserve existing changes.
- Read the relevant source files, routes, scripts, configuration, and backend
  documentation.
- Verify installed versions instead of relying on assumptions.

## 2. Plan

State:

- The single milestone goal
- Files likely to change
- Acceptance criteria
- Risks and unknowns
- Verification commands

Do not begin a later milestone early.

## 3. Implement

Make the smallest coherent change. Preserve standalone components and the
feature-based structure. Keep business logic in services and UI behavior in
components. Do not invent API contracts.

## 4. Verify

Use commands supported by the current repository. At minimum, run the relevant
build and diagnostics. Run tests or lint only when configured, and report
missing targets honestly.

## 5. Repair

Diagnose failures from their actual output. Make no more than three focused
repair attempts for a milestone. If the work remains blocked, stop and report
the evidence.

## 6. Review

Inspect the full diff for:

- Unrelated files or accidental deletions
- Type and route regressions
- Missing loading/error/empty states
- Accessibility problems
- Secrets or direct fake-payment-gateway calls
- Unnecessary dependencies

## 7. Update and report

Update the relevant project documentation with verified facts. Report changed
files, design decisions, commands and actual results, manual verification
steps, limitations, and the next milestone. Stop and wait for approval.

Do not commit or push unless explicitly approved. See
[AGENTS.md](../../AGENTS.md) for repository contribution rules.
