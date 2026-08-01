# Take-Home Bundle Builder - Back-End

Express.js & TypeScript RESTful API service backed by MongoDB for managing security bundles, products, plans, and checkout orders.

## Features
- **Product Catalog API**: Serves products filtered by category (cameras, sensors, accessories).
- **Protection Plans API**: Returns available security subscription plans.
- **Bundle Management & Pricing Engine**: Create, retrieve, update saved bundles, and dynamically calculate original price, sale price, and total savings.
- **Interactive Swagger Documentation**: Interactive OpenAPI 3.0 UI rendered at `/api-docs`.
- **Database Seeding**: Clean MongoDB seed script to populate products and plans.

## Tech Stack
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **API Documentation**: Swagger UI Express & Swagger JSDoc

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (MongoDB Atlas)

### Setup (clean clone)
```bash
git clone <repo-url>
cd take-home-bundle-builder-backend
npm install
```

### Environment variables
Copy the example env file:
```bash
cp .env.example .env
```
Then set in `.env` , `.env.example`:
```env
PORT=4000
MONGO_URI=mongodb+srv://amrarthur8_db_user:7DRERJlQ03MxsQ28@taskecomexperts.0senase.mongodb.net/?appName=TaskEcomExperts
```


### Seed the database
Populates products and plans:
```bash
npm run seed
```

### Run (development)
```bash
npm run dev
```
API at `http://localhost:4000`.

### Build (production)
```bash
npm run build
```
Compiles TS to `dist/`.

### Start (production)
```bash
npm start
```
Runs `dist/server.js` — build first.

### API docs (Swagger)
Local: `http://localhost:4000/api-docs`
Hosted: https://take-home-bundle-back-end-production.up.railway.app/api-docs/#/

