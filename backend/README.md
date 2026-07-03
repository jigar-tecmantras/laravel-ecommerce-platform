# Backend (Laravel)

The backend is a Laravel 11 project exposing REST endpoints for catalog, cart, orders, admin, and reporting responsibilities defined in the CRD.

## Key Modules

- **Authentication**: Email/password registration and login backed by Sanctum tokens for API security.
- **Catalog**: Products, categories, and brands with filtering support.
- **Cart & Checkout**: Cart management + order creation with stock adjustments.
- **Orders & Admin**: Order lifecycle, payment status tracking, and admin dashboard summaries.
- **Integrations & Analytics**: Mailables for email confirmations, SMS placeholders, and a lightweight analytics dispatcher (logs + webhook stub).

## Local Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

> Use `php artisan queue:work` for queued notifications (pending `QUEUE_CONNECTION=database|redis`).

### Seeded data
- **Admin user**: `maya.kim@example.com` / `Welcome123!`
- **Customers**: `leo.park@example.com` and `anisa.diaz@example.com` share `Catalog123!` and `CartTime7!` respectively.
- **Catalog**: Includes brands (Hearth & Timber, Northwind Studio, Atlas Atelier) and product lines seeded with stock levels for reporting.

> Running `php artisan db:seed` refreshes the sample catalog, cart, and order data used by the React storefront.

## API Endpoints Snapshot

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a customer and receive Sanctum token |
| POST | `/api/auth/login` | Authenticate and retrieve token |
| GET | `/api/products` | Paginated list with filters |
| GET | `/api/products/{product}` | Single product details |
| POST | `/api/cart` | Add or update cart item |
| GET | `/api/cart` | Retrieve active cart |
| POST | `/api/checkout` | Create an order from cart |
| GET | `/api/admin/overview` | Admin dashboard metrics |
| POST | `/api/admin/reports/sales` | Aggregated sales report |

> Additional endpoints and query parameters are documented inline with each controller file.
