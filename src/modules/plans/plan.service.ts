import { PlanModel } from "./plan.model";

export async function getPlans() {
  return PlanModel.find().lean();
}
