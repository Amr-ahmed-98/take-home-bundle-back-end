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
- Node.js (v18 or higher)
- MongoDB instance (local or MongoDB Atlas)

### Installation
1. Navigate to the back-end directory:
   ```bash
   cd take-home-bundle-builder-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Create a `.env` file in the root of `take-home-bundle-builder-backend`:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/take_home_bundle
   ```

4. Database Seeding:
   Seed MongoDB with initial products and plans:
   ```bash
   npm run seed
   ```

5. Run Development Server:
   ```bash
   npm run dev
   ```
   The API server will run at `http://localhost:4000`.

6. Interactive Swagger Documentation:
   Open `http://localhost:4000/api-docs` in your browser.

7. Build for Production:
   ```bash
   npm run build
   ```

## Deployment on Railway

1. Push your repository to GitHub.
2. Log in to [Railway.app](https://railway.app) and create a **New Project**.
3. Select **Deploy from GitHub repo** and pick `take-home-bundle-builder-backend`.
4. Provision a **MongoDB Database** service in Railway.
5. In your Railway service settings, add Environment Variables:
   - `PORT`: `${PORT}` (automatically assigned by Railway)
   - `MONGO_URI`: `${{MongoDB.MONGO_URL}}` (connected Railway Mongo URL)
6. Railway will automatically detect Node.js, run `npm run build`, and execute `npm start` (`node dist/server.js`).
7. Run database seed on Railway via Railway CLI or environment trigger: `npm run seed`.
