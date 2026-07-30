import { Router } from "express";
import { productRoutes } from "../modules/products/product.routes";
import { planRoutes } from "../modules/plans/plan.routes";
import { bundleRoutes } from "../modules/bundles/bundle.routes";
import { orderRoutes } from "../modules/orders/order.routes";

export const routes = Router();

routes.use("/products", productRoutes);
routes.use("/plans", planRoutes);
routes.use("/bundles", bundleRoutes);
routes.use("/orders", orderRoutes);
