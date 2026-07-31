import { Router } from "express";
import { listProducts } from "./product.controller.js";

export const productRoutes = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: >
 *       Returns every product, optionally filtered by category.
 *       Each product may include a `variants` array (e.g. color options),
 *       each variant optionally carrying its own image.
 *     tags: [Products]
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         description: Filter products down to a single category.
 *         schema:
 *           type: string
 *           enum: [cameras, sensors, accessories]
 *     responses:
 *       200:
 *         description: List of products matching the filter (or all, if omitted).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoutes.get("/", listProducts);