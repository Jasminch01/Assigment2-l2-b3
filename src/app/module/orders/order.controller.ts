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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const result = await orderServices.getAllOrderByEmailDB(email);
      if (result.length === 0) {
        res.status(200).json({
          success: false,
          message: "order not found",
          data: null,
        });
      }
      try {
        res.status(200).json({
          success: true,
          message: "orders are retrived successfully",
          data: result,
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      const result = await orderServices.getAllOrderDB();
      if (!result) {
        res.status(500).json({
          success: false,
          message: "data not found",
          result: result,
        });
      }
      try {
        res.status(200).json({
          success: true,
          message: "All Product are retrived successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "failed to retirved data",
          data: error,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to retirved data",
      data: error,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
