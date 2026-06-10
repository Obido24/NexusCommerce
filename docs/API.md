# Midr Store API

All responses follow:

```json
{ "ok": true, "data": {} }
```

Errors follow:

```json
{ "ok": false, "error": { "message": "Validation failed", "details": {} } }
```

## Authentication

`POST /api/auth/login`

```json
{ "email": "admin@midr.store", "password": "Password123!" }
```

Sets an HTTP-only `nexus_session` JWT cookie.

`POST /api/auth/register`

```json
{ "name": "New Customer", "email": "new@example.com", "password": "Password123!" }
```

`POST /api/auth/logout` clears the session.

## Products

`GET /api/products?q=perfume&category=perfume&sort=price-asc`

`POST /api/products` requires an admin JWT:

```json
{
  "name": "Midr Satin Evening Clutch",
  "sku": "MID-BAG-330",
  "description": "A compact satin clutch for dinner dates and events.",
  "price": 42,
  "categoryId": "cat_bags",
  "status": "ACTIVE",
  "imageUrl": "https://images.unsplash.com/photo.jpg"
}
```

## Cart and Checkout

`POST /api/cart`

```json
{ "productId": "prd_ankara_dress", "quantity": 1 }
```

`POST /api/orders`

```json
{
  "provider": "stripe",
  "couponCode": "WELCOME10",
  "address": {
    "firstName": "Jordan",
    "lastName": "Blake",
    "line1": "120 Market Street",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78701",
    "country": "US"
  }
}
```

## Admin

`GET /api/analytics`, `GET /api/customers`, `PATCH /api/orders/:id`, `POST /api/uploads`, and product mutations require an admin JWT.
