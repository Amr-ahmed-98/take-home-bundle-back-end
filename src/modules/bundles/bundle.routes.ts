import { Router } from "express";
import { postBundle, putBundle, getBundleById, calculateBundle } from "./bundle.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { bundleInputSchema } from "./bundle.types.js";

export const bundleRoutes = Router();

/**
 * @openapi
 * /bundles:
 *   post:
 *     summary: Create a new security bundle
 *     description: >
 *       Saves a new bundle configuration (cameras, sensors, accessories, plan, step).
 *       Line items with `qty: 0` are dropped by convention on the frontend, but the
 *       backend accepts any qty >= 0.
 *     tags: [Bundles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bundle'
 *     responses:
 *       201:
 *         description: Bundle successfully created, including its generated `id`.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 *       400:
 *         description: Body failed validation (e.g. bad line item shape).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bundleRoutes.post("/", validateRequest(bundleInputSchema), postBundle);

/**
 * @openapi
 * /bundles/calculate:
 *   post:
 *     summary: Calculate total bundle pricing and savings
 *     description: >
 *       Stateless pricing calculation — does not read or write a saved bundle.
 *       Pass the current in-progress bundle selection to get original price,
 *       discounted price, and total savings.
 *     tags: [Bundles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bundle'
 *     responses:
 *       200:
 *         description: Pricing summary for the given bundle selection.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PricingSummary'
 *       400:
 *         description: Body failed validation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bundleRoutes.post("/calculate", calculateBundle);

/**
 * @openapi
 * /bundles/{id}:
 *   put:
 *     summary: Update an existing bundle configuration
 *     tags: [Bundles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the bundle to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bundle'
 *     responses:
 *       200:
 *         description: Updated bundle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 *       400:
 *         description: Body failed validation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No bundle found with that ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bundleRoutes.put("/:id", validateRequest(bundleInputSchema), putBundle);

/**
 * @openapi
 * /bundles/{id}:
 *   get:
 *     summary: Get a bundle configuration by ID
 *     tags: [Bundles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the bundle to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bundle details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 *       404:
 *         description: No bundle found with that ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bundleRoutes.get("/:id", getBundleById);