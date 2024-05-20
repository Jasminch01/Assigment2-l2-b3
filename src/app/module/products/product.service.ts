import { ObjectId } from "mongodb";
import { productModel } from "../product.model";
import { Iproduct } from "./products.interface";

const createProductDB = async (product: Iproduct) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductDB = async () => {
  const result = await productModel.find();
  return result;
}

const getSingleProductDB = async (id : string) => {
  const result = await productModel.findOne({_id : new ObjectId(id)})
  return result;
}

export const productService = {
  createProductDB,
  getAllProductDB,
  getSingleProductDB,
};
