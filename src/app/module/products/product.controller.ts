import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    // console.log(product)
    // const validNewProduct = productValidationSchema.parse(product);
    const result = await productService.createProductDB(product);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductDB();
    if (!result) {
      res.status(500).json({
        success: false,
        message: "data not found",
        result: result,
      });
    }
    res.status(200).json({
      success: true,
      message: "All Product are retrived successfully",
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductDB(productId);
    if (!result) {
      res.status(500).json({
        success: false,
        message: "data not found",
        data: result,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = req.body;
    const { productId } = req.params;
    const result = await productService.updateProductDB(
      productId,
      updateProduct
    );
    if (!result) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "product updated successfully",
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
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductDB(productId);
    if (!result) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
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
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
