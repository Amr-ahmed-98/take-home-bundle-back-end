import { Request, Response } from "express";
import { getProducts } from "./product.service.js";

export async function listProducts(req: Request, res: Response) {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const products = await getProducts(category);
  res.json(products);
}
