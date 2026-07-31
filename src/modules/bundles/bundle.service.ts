import { v4 as uuid } from "uuid";
import { BundleModel } from "./bundle.model.js";
import { BundleInput } from "./bundle.types.js";
import { ProductModel } from "../products/product.model.js";
import { PlanModel } from "../plans/plan.model.js";

export async function createBundle(input: BundleInput) {
  const id = uuid();
  const bundle = await BundleModel.create({ _id: id, ...input });
  return bundle.toObject();
}

export async function upsertBundle(id: string, input: BundleInput) {
  const bundle = await BundleModel.findByIdAndUpdate(
    id,
    { ...input },
    { new: true, upsert: true }
  );
  return bundle.toObject();
}

export async function getBundle(id: string) {
  return BundleModel.findById(id).lean();
}

export async function calculateBundlePricing(bundle: Partial<BundleInput>) {
  const products = await ProductModel.find().lean();
  const plans = await PlanModel.find().lean();

  const cameras = bundle.cameras || [];
  const sensors = bundle.sensors || [];
  const accessories = bundle.accessories || [];
  const allLines = [...cameras, ...sensors, ...accessories];

  let original = 0;
  let discounted = 0;

  for (const line of allLines) {
    const product = products.find(
      (p) => p.id === line.productId || p._id.toString() === line.productId
    );
    if (!product) continue;

    const unitOriginal = product.price;
    const unitSale =
      product.salePrice !== undefined && product.salePrice !== null
        ? product.salePrice
        : product.price;

    original += unitOriginal * line.qty;
    discounted += unitSale * line.qty;
  }

  if (bundle.planId) {
    const plan = plans.find(
      (p) => p.id === bundle.planId || p._id.toString() === bundle.planId
    );
    if (plan) {
      const planSale =
        plan.salePrice !== undefined && plan.salePrice !== null
          ? plan.salePrice
          : plan.price;
      original += plan.price;
      discounted += planSale;
    }
  }

  const savings = original - discounted;

  return {
    original: Math.round(original * 100) / 100,
    discounted: Math.round(discounted * 100) / 100,
    savings: Math.round(savings * 100) / 100,
  };
}
