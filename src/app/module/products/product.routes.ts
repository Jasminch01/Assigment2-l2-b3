import express from "express";
import { productController } from "./product.controller";
import { orderController } from "../orders/order.controller";
const router = express.Router();

//product router
router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProduct);
router.get("/products/:productId", productController.getSingleProduct);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
//order router
router.post("/orders", orderController.createOrder);

export default router;
