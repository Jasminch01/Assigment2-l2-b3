import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const  product  = req.body;
    const { value, error } = productValidationSchema.validate(product);
    if (!error) {
      const result = await productService.createProductDB(value);
      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        data: result,
      });
    }
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
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await productService.searchProductDB(searchTerm);
      if (result.length === 0) {
        res.status(500).json({
          success: false,
          message: "Product not found",
          data: null,
        });
      }
      try {
        res.status(200).json({
          success: true,
          messge: `Products matching search term ${searchTerm} fetched successfully!`,
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
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
    }
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
    console.log(result);
    if (!result) {
      res.status(500).json({
        success: false,
        message: "product not found",
        data: result,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the product",
        error: error.message,
      });
    }
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
    if (!result || result.modifiedCount < 1) {
      res.status(500).json({
        success: false,
        message: "something went wrong product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: result,
    });
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "An error occurred while update the product",
        error: error.message,
      });
    }
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductDB(productId);
    if (result.deletedCount < 1) {
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
