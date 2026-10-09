# Ecommerce Client

## Overview

Angular customer-facing e-commerce client for the Order Processing System.

Start with the maintained project documentation:

- [Project documentation](docs/PROJECT_DOCUMENTATION.md)
- [Agent and contributor documentation](docs/agents/README.md)
- [Current project status](docs/PROJECT_STATUS.md)

## Local development

From the repository root:

```powershell
npm install
npm start
```

The development server uses:

```text
http://localhost:4200
```

## Backend boundary

Angular must communicate only with the Order Service. It must not call the
fake payment gateway directly. The API contract and authoritative base URL are
currently unresolved; see [DECISIONS_AND_GAPS.md](docs/agents/DECISIONS_AND_GAPS.md).
