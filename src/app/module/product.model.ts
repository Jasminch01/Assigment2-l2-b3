import { Schema, model } from "mongoose";
import { Iivertry, Iproduct, Ivariant } from "./products/products.interface";

const iventrySchema = new Schema<Iivertry>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const variantSchema = new Schema<Ivariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  desctiption: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tages: { type: [String], required: true },
  variantes: { type: [variantSchema], required: true },
  iventry: iventrySchema,
});

export const productModel = model<Iproduct>("product", productSchema);
