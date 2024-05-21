"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const product_service_1 = require("../products/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const { productId, quantity } = newOrder;
        const productStockQuantity = yield product_service_1.productService.checkQuantityOfProducts(productId);
        if (productStockQuantity >= quantity) {
            const productQantity = yield product_service_1.productService.subtractProduct(productId, quantity);
            if (productQantity === null || productQantity === void 0 ? void 0 : productQantity.modifiedCount) {
                const result = yield order_service_1.orderServices.createOrderDB(newOrder);
                res.status(200).json({
                    success: true,
                    message: "order is created successfully",
                    data: result,
                });
            }
        }
        else {
            res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "insufficiant product",
            data: error,
        });
    }
});
exports.orderController = {
    createOrder,
};
