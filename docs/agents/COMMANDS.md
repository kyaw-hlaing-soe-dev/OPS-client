# Commands

Run commands from the repository root, the directory containing
`package.json`.

## Verified commands

| Command | Purpose | Current status |
|---|---|---|
| `npm install` | Install dependencies from `package.json` | Declared; not a project test |
| `npm start` | Start the Angular development server | Declared; serves on `http://localhost:4200` by default |
| `npm run build` | Create the production Angular build | Passed on 2026-10-08; see [PROJECT_STATUS.md](../PROJECT_STATUS.md) |
| `npm run watch` | Run a development build in watch mode | Declared in `package.json` |
| `npm test` | Invoke the Angular test target | Failed before execution on 2026-10-08; see [PROJECT_STATUS.md](../PROJECT_STATUS.md) |

The direct Angular CLI wrapper is also available:

```powershell
npm run ng -- version
```

## Build output

`npm run build` writes the application to:

```text
dist/ecommerce-client
```

The production configuration uses output hashing and bundle/style budgets.

## Missing checks

The current test, lint, and deployment gaps are maintained in
[PROJECT_STATUS.md](../PROJECT_STATUS.md). Do not report an unavailable check
as passing.
