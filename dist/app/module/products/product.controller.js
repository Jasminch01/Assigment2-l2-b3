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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        // const validNewProduct = productValidationSchema.parse(product);
        const result = yield product_service_1.productService.createProductDB(product);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: null,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm) {
            const result = yield product_service_1.productService.searchProductDB(searchTerm);
            if (result.length === 0) {
                res.status(500).json({
                    success: false,
                    message: "Product not found",
                    data: result,
                });
            }
            res.status(200).json({
                success: true,
                messge: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.productService.getAllProductDB();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: null,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getSingleProductDB(productId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: null,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateProduct = req.body;
        const { productId } = req.params;
        const result = yield product_service_1.productService.updateProductDB(productId, updateProduct);
        if (!result || result.modifiedCount < 1 || result.modifiedCount < 1) {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: null,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.deleteProductDB(productId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            data: null,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
