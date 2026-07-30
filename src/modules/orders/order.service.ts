import { OrderModel } from "./order.model";

export interface CreateOrderInput {
  bundleId: string;
  email: string;
  address: string;
  total: number;
}

export async function createOrder(input: CreateOrderInput) {
  const order = await OrderModel.create(input);
  return order.toObject();
}
