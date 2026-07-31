import { Router } from "express";
import { listPlans } from "./plan.controller.js";

export const planRoutes = Router();

/**
 * @openapi
 * /plans:
 *   get:
 *     summary: Retrieve all available protection plans
 *     description: Returns every protection plan a customer can attach to a bundle.
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: List of protection plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
planRoutes.get("/", listPlans);