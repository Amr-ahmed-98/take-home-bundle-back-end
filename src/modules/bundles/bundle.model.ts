import { Schema, model } from "mongoose";

const lineItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    qty: { type: Number, required: true },
    variant: { type: String },
  },
  { _id: false }
);

const bundleSchema = new Schema(
  {
    _id: { type: String, required: true },
    cameras: { type: [lineItemSchema], default: [] },
    sensors: { type: [lineItemSchema], default: [] },
    accessories: { type: [lineItemSchema], default: [] },
    planId: { type: String, default: null },
    step: { type: Number, default: 1 },
  },
  { timestamps: true, _id: false }
);

export const BundleModel = model("Bundle", bundleSchema);
