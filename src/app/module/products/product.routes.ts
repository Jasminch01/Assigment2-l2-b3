import express from "express";
import { productController } from "./product.controller";
import { orderController } from "../orders/order.controller";
const router = express.Router();

//product route
router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProduct);
router.get("/products/:productId", productController.getSingleProduct);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
//order route
router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);

export default router;
