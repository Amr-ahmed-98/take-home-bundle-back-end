import { Router } from "express";
import { productRoutes } from "../modules/products/product.routes.js";
import { planRoutes } from "../modules/plans/plan.routes.js";
import { bundleRoutes } from "../modules/bundles/bundle.routes.js";
import { orderRoutes } from "../modules/orders/order.routes.js";

export const routes = Router();

routes.use("/products", productRoutes);
routes.use("/plans", planRoutes);
routes.use("/bundles", bundleRoutes);
routes.use("/orders", orderRoutes);
