import { Request, Response } from "express";
import { createBundle, upsertBundle, getBundle, calculateBundlePricing } from "./bundle.service";

export async function postBundle(req: Request, res: Response) {
  const bundle = await createBundle(req.body);
  res.status(201).json(bundle);
}

export async function putBundle(req: Request, res: Response) {
  const bundle = await upsertBundle(req.params.id, req.body);
  res.json(bundle);
}

export async function getBundleById(req: Request, res: Response) {
  const bundle = await getBundle(req.params.id);
  if (!bundle) return res.status(404).json({ message: "Bundle not found" });
  res.json(bundle);
}

export async function calculateBundle(req: Request, res: Response) {
  const pricing = await calculateBundlePricing(req.body);
  res.json(pricing);
}
