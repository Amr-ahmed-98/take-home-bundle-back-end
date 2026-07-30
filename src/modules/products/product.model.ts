import { Schema, model } from "mongoose";

const variantSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    id: { type: String },
    category: { type: String, enum: ["cameras", "sensors", "accessories"], required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    badge: { type: String },
    variants: { type: [variantSchema], default: undefined },
    required: { type: Boolean, default: false },
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

export const ProductModel = model("Product", productSchema);
