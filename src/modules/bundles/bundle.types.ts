import { z } from "zod";

const lineItemSchema = z.object({
  productId: z.string(),
  qty: z.number().int().min(0),
  variant: z.string().optional(),
});

export const bundleInputSchema = z.object({
  cameras: z.array(lineItemSchema).default([]),
  sensors: z.array(lineItemSchema).default([]),
  accessories: z.array(lineItemSchema).default([]),
  planId: z.string().nullable().default(null),
  step: z.number().int().min(1).max(4).default(1),
});

export type BundleInput = z.infer<typeof bundleInputSchema>;
