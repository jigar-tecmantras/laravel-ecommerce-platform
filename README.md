# Laravel Ecommerce Platform

This repository contains the frontend experience and Laravel backend for a modern eCommerce platform inspired by the provided CRD. We are building a RESTful API, responsive customer storefront, and administrative visibility into catalog, cart, orders, and reporting workflows.

## High-Level Architecture

- **Backend**: Laravel 11 with Sanctum, RESTful resources for products, catalog metadata, cart, orders, admin dashboards, and email/SMS/analytics integration hooks.
- **Frontend**: React (Create React App) delivering a responsive shopping experience with home, catalog, cart, checkout, and admin screens.

## Primary Requirements Addressed

| Requirement Area | Solution Highlights |
| --- | --- |
| Customer Experience | Hero/promotions, product cards, category navigation, cart preview, checkout form, responsive layout for desktop/tablet/mobile. |
| Admin/Reports | Admin dashboard page with metrics, REST APIs for reporting endpoints, analytics hooks for sales/inventory events. |
| Integrations | Placeholder Email/SMS notifier and analytics dispatcher services (logs + mail queue). |
| Non-Functional | API-first (Laravel), responsive React UI, Sanctum tokens for security, environment-driven configuration for scalability. |

## Getting Started

### Backend
1. `cd backend`
2. `composer install`
3. Copy `.env.example` to `.env` and adjust database, mail, and SMS settings.
4. `php artisan key:generate`
5. `php artisan migrate`
6. `php artisan serve`
7. Configure a queue worker or use the `sync` mail driver for email delivery.

### Frontend
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `REACT_APP_API_URL` if the Laravel API runs on a different host or port.
4. `npm start` to run the CRA development server.

### Deployment Notes
- Frontend can be built with `npm run build` and deployed to any static host (Netlify, Vercel, etc.).
- Backend is ready for any PHP hosting or containers; `queue:work` should be running for asynchronous jobs.
- Keep API base URLs in environment variables to support staging/production splits.
