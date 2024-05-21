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
exports.productService = void 0;
const mongodb_1 = require("mongodb");
const product_model_1 = require("../product.model");
const createProductDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.create(product);
    return result;
});
const getAllProductDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.find();
    return result;
});
const getSingleProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.findOne({ _id: new mongodb_1.ObjectId(id) });
    return result;
});
const updateProductDB = (id, productUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = { _id: new mongodb_1.ObjectId(id) };
    const result = yield product_model_1.productModel.updateOne(productId, productUpdate);
    return result;
});
const deleteProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = { _id: new mongodb_1.ObjectId(id) };
    const result = yield product_model_1.productModel.deleteOne(productId);
    return result;
});
exports.productService = {
    createProductDB,
    getAllProductDB,
    getSingleProductDB,
    updateProductDB,
    deleteProductDB,
};
