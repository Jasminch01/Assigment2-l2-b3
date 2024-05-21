import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { productService } from "../products/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const { productId, quantity } = newOrder;
    const productQantity = await productService.countOrder(productId, quantity);
    if (productQantity.modifiedCount) {
      const result = await orderServices.createOrderDB(newOrder);
      res.status(200).json({
        success: true,
        message: "order is created successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somthing went wrong",
      data: error,
    });
  }
};

export const orderController = {
  createOrder,
};
