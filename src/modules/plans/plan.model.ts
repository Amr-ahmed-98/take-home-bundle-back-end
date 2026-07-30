import { Schema, model } from "mongoose";

const planSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        if (!ret.id && ret._id) ret.id = ret._id.toString();
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        if (!ret.id && ret._id) ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

export const PlanModel = model("Plan", planSchema);
