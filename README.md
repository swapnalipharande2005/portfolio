# Smart Cafe Experience

Smart Cafe Experience is a full-stack cafe website built with:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Database: MySQL

It includes menu browsing, cart and checkout, user authentication, order history, smart recommendations, reviews, table reservations, and an admin dashboard.

## Folder Structure

```text
smart-cafe-experience/
|-- frontend/
|   |-- index.html
|   |-- pages/
|   |-- scripts/
|   |-- styles/
|-- backend/
|   |-- app.js
|   |-- server.js
|   |-- config/
|   |-- middleware/
|-- controllers/
|-- models/
|-- routes/
|-- database/
|   |-- schema.sql
|-- package.json
|-- .env.example
```

## Setup Instructions

1. Install Node.js and MySQL on your computer.
2. Open MySQL and run the SQL inside `database/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Update the MySQL credentials and JWT secret inside `.env`.
5. Install project dependencies:

```bash
npm install
```

6. Start the server:

```bash
npm start
```

7. Open the app in your browser:

```text
http://localhost:5000
```

## Demo Accounts

- Admin: `admin@smartcafe.com` / `password123`
- Customer: `aarav@example.com` / `password123`

## Main Features

- Attractive responsive homepage with hero images
- Dynamic menu fetched from backend
- Add to cart and checkout flow
- Reservation form saved in MySQL
- Smart recommendations using previous orders and popular items
- Register and login with hashed passwords
- JWT-protected routes and admin dashboard
- Review system with ratings and comments
- Contact page with map, address, and timings
- Dark mode toggle and today's special

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/menu`
- `GET /api/menu/recommendations`
- `GET /api/menu/special`
- `POST /api/cart`
- `POST /api/order`
- `GET /api/order/history`
- `POST /api/reservation`
- `GET /api/review`
- `POST /api/review`
- `GET /api/admin/dashboard`
- `POST /api/admin/menu`
- `PUT /api/admin/menu/:id`
- `DELETE /api/admin/menu/:id`

## Beginner Notes

- The frontend stores cart data in local storage.
- The backend validates cart data before checkout.
- The database schema adds a `role` column to the `users` table so admin login can be supported cleanly.
- Menu images are loaded from public image URLs to keep the project easy to run.
