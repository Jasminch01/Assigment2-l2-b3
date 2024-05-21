import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { productService } from "../products/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const { productId, quantity } = newOrder;
    const productStockQuantity = await productService.checkQuantityOfProducts(
      productId
    );
    if (productStockQuantity >= quantity) {
      const productQantity = await productService.subtractProduct(
        productId,
        quantity
      );
      if (productQantity?.modifiedCount) {
        const result = await orderServices.createOrderDB(newOrder);
        res.status(200).json({
          success: true,
          message: "order is created successfully",
          data: result,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "insufficiant product",
      data: error,
    });
  }
};

export const orderController = {
  createOrder,
};
