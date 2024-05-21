import { oderModel } from "../order.model";
import { Iorder } from "./order.interface";
const createOrderDB = async (newOrder: Iorder) => {
  const result = await oderModel.create(newOrder);
  return result;
};

export const orderServices = {
  createOrderDB,
};
