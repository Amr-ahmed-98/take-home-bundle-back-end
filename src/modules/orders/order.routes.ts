import { Router } from "express";
import { postOrder } from "./order.controller.js";

export const orderRoutes = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Place an order for a bundle
 *     description: Creates an order for a previously-saved bundle (`bundleId` must already exist).
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Missing or invalid order fields.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
orderRoutes.post("/", postOrder);