import { Schema, model } from "mongoose";
import { Iinventory, Iproduct, Ivariants } from "./products/products.interface";

const iventorySchema = new Schema<Iinventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const variantSchema = new Schema<Ivariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: iventorySchema,
});

export const productModel = model<Iproduct>("product", productSchema);
