# Order Service API Contract

## Status

The Order Service Swagger/OpenAPI contract is currently unavailable to the frontend workspace.

The following local Swagger/OpenAPI locations were probed during baseline inspection and were not reachable:

- `http://localhost:8080/v3/api-docs`
- `http://localhost:8080/swagger-ui/index.html`
- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8086/QMS/v3/api-docs`
- `http://localhost:8086/QMS/swagger-ui/index.html`
- `http://localhost:8086/QMS/swagger-ui.html`

## Required before HTTP integration

Provide the authoritative Swagger/OpenAPI document or a running Swagger URL containing:

- Product listing endpoint, method, parameters, and response schema
- Product detail endpoint, method, parameters, and response schema
- Order creation endpoint, method, request schema, and response schema
- Order detail endpoint, method, parameters, and response schema
- Allowed order status values
- Error response schema
- Authoritative Order Service base URL

## Frontend boundary

Angular must communicate only with the Order Service. The Order Service is responsible for communicating with the fake payment gateway. No fake payment gateway URL, credential, or endpoint belongs in this frontend.

Until the contract is available, frontend-only milestones may use clearly labeled typed mock data behind services. Mock behavior must not be presented as a live backend integration.
