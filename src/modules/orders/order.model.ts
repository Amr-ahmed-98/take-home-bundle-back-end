import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    bundleId: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", orderSchema);
