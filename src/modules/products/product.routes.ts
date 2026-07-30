import { Router } from "express";
import { listProducts } from "./product.controller";

export const productRoutes = Router();

productRoutes.get("/", listProducts);
