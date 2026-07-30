import { Router } from "express";
import { postOrder } from "./order.controller";

export const orderRoutes = Router();

orderRoutes.post("/", postOrder);
