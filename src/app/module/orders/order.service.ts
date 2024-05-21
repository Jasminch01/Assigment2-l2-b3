import { oderModel } from "../order.model";
import { Iorder } from "./order.interface";
const createOrderDB = async (newOrder: Iorder) => {
  const result = await oderModel.create(newOrder);
  return result;
};
const getAllOrderDB = async () => {
  const result = await oderModel.find()
  return result;
};
const getAllOrderByEmailDB = async (UserEmail : string) => {
  const result = await oderModel.find({email : UserEmail})
  return result;
};

export const orderServices = {
  createOrderDB,
  getAllOrderDB,
  getAllOrderByEmailDB,
};
