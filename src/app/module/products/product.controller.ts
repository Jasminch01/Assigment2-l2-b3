import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productModel } from "../product.model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const validNewProduct = productValidationSchema.parse(newProduct);

    const result = await productModel.create(validNewProduct);
    res.status(200).json({
      success: true,
      message: "a new product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
};

export const productController = {
  createProduct,
};
