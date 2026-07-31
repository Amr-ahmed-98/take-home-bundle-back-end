import { Router } from "express";
import { postOrder } from "./order.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/", postOrder);
