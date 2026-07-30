import { Router } from "express";
import { postBundle, putBundle, getBundleById, calculateBundle } from "./bundle.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { bundleInputSchema } from "./bundle.types";

export const bundleRoutes = Router();

bundleRoutes.post("/", validateRequest(bundleInputSchema), postBundle);
bundleRoutes.post("/calculate", calculateBundle);
bundleRoutes.put("/:id", validateRequest(bundleInputSchema), putBundle);
bundleRoutes.get("/:id", getBundleById);
