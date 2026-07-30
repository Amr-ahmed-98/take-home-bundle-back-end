import { Router } from "express";
import { listPlans } from "./plan.controller";

export const planRoutes = Router();

planRoutes.get("/", listPlans);
