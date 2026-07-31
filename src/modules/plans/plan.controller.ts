import { Request, Response } from "express";
import { getPlans } from "./plan.service.js";

export async function listPlans(_req: Request, res: Response) {
  const plans = await getPlans();
  res.json(plans);
}
