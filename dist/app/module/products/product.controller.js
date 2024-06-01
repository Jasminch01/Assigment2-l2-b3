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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = product_validation_1.default.validate(req.body);
        if (!error) {
            const result = yield product_service_1.productService.createProductDB(value);
            res.status(200).json({
                success: true,
                message: "Product created successfully!",
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
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm) {
            const result = yield product_service_1.productService.searchProductDB(searchTerm);
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
            }
            catch (error) {
                console.log(error);
            }
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
    }
    catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching the product",
                error: error.message,
            });
        }
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateProduct = req.body;
        const { productId } = req.params;
        const result = yield product_service_1.productService.updateProductDB(productId, updateProduct);
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
    }
    catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "An error occurred while update the product",
                error: error.message,
            });
        }
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
