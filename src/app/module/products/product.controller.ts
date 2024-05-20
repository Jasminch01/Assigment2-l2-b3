import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const {product} = req.body;
    // console.log(product)
    // const validNewProduct = productValidationSchema.parse(product);
    const result = await productService.createProductDB(product);
    res.status(200).json({
      success: true,
      message: "a new product created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      data: null,
    });
  }
};

export const productController = {
  createProduct,
};
