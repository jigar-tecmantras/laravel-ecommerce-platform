# Frontend (React)

The frontend is a Create React App (CRA) project that consumes the Laravel API. It delivers a responsive eCommerce experience with home, catalog, checkout, and admin pages.

## Key UI Pieces

- **Home**: Hero banner, featured cards, category navigation, cart preview summary for quick context.
- **Catalog**: Product grid with filters and pagination hooks ready for API connections.
- **Cart & Checkout**: Inline cart preview and a checkout form that prepares customer data for API submission.
- **Admin**: Dashboard tiles visualizing orders, revenue, and conversion-ready analytics insights.

## Getting Started

```bash
cd frontend
npm install
cp .env.example .env # adjust API URL if needed
npm start
```

## Environment

- `REACT_APP_API_URL`: Laravel API base route (default: `http://localhost:8000/api`).
- `REACT_APP_ANALYTICS_ENDPOINT`: Optional analytics webhook target (e.g., `https://events.example.com/collect`).

## Structure Highlights

- `src/api`: Axios instance capturing auth headers and base URL.
- `src/components`: Reusable UI building blocks (Hero, product cards, checkout form, admin summary tiles).
- `src/pages`: Routed views for customers and admins.

Responsive design is achieved through CSS Grid/Flex utilities plus media queries in `App.css`.
