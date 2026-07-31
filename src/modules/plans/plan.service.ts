import { PlanModel } from "./plan.model.js";

export async function getPlans() {
  return PlanModel.find().lean();
}
