import { Schema, model } from "mongoose";
import { Iorder } from "./orders/order.interface";

const orderSchema = new Schema<Iorder>({
  email: { type: String, required: true },
  productId: { type: Number, required: true },
  Price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const oderModel = model<Iorder>("order", orderSchema);
