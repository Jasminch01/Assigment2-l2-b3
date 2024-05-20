import { productModel } from "../product.model";
import { Iproduct } from "./products.interface";

const createProductDB = async (product: Iproduct) => {
  const result = await productModel.create(product);
  return result;
};

export const productService = {
  createProductDB,
};
