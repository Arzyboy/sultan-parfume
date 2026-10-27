# Sultan Parfume MVP

Frontend demo company profile, login admin, dashboard, kasir, inventory, and a local JSON API.

## Run locally

```powershell
node server.js
```

Then open `http://localhost:3000`.

Demo login:
- Email: `admin@sultanparfume.id`
- Password: `sultan2026`

## API

- `GET /api/health`
- `GET /api/products`
- `GET /api/orders`
- `GET /api/stats`
- `POST /api/orders` with `{ "customer": "...", "items": ["Oud Royale"], "total": 590000 }`

The JSON store is intentionally local for this review phase. Production deployment should replace it with PostgreSQL/MySQL and secure auth.

## Demo roles
- Owner: admin@sultanparfume.id / sultan2026
- Kasir: staff@sultanparfume.id / staff2026

Additional API: /api/login, /api/customers, /api/suppliers, /api/purchase-orders, /api/vouchers

