import { Request, Response } from "express";
import { createOrder } from "./order.service";

export async function postOrder(req: Request, res: Response) {
  const order = await createOrder(req.body);
  res.status(201).json(order);
}
