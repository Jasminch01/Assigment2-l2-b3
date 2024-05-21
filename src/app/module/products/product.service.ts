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
};

const getSingleProductDB = async (id: string) => {
  const result = await productModel.findOne({ _id: new ObjectId(id) });
  return result;
};

const updateProductDB = async (id: string, productUpdate: Iproduct) => {
  const productId = { _id: new ObjectId(id) };
  const result = await productModel.updateOne(productId, productUpdate);
  return result;
};

const deleteProductDB = async (id: string) => {
  const productId = { _id: new ObjectId(id) };
  const result = await productModel.deleteOne(productId);
  return result;
};

const searchProductDB = async (searchTerm: any) => {
  const result = await productModel.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { discription: { $regex: searchTerm, $options: "i" } },
          { tags: { $regex: searchTerm, $options: "i" } },
        ],
      },
    },
  ]);
  return result;
};

const countOrder = async (productId: string, quantity: number) => {
  const id = { _id: new ObjectId(productId) };
  const result = await productModel.updateOne(id, [
    {
      $set: {
        "inventory.quantity": {
          $subtract: ["$inventory.quantity", quantity],
        },
      },
    },
  ]);

  return result;
};

export const productService = {
  createProductDB,
  getAllProductDB,
  getSingleProductDB,
  updateProductDB,
  deleteProductDB,
  searchProductDB,
  countOrder,
};
