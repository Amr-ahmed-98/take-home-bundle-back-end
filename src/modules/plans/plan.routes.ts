import { Router } from "express";
import { listPlans } from "./plan.controller.js";

export const planRoutes = Router();

planRoutes.get("/", listPlans);
