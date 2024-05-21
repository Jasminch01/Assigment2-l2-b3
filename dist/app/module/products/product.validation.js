"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi schema for inventory
const inventorySchema = joi_1.default.object({
    quantity: joi_1.default.number().min(0).required(),
    inStock: joi_1.default.boolean().required(),
});
// Define Joi schema for variants
const variantSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    value: joi_1.default.string().required(),
});
// Define Joi schema for product
const productValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().min(0).required(),
    category: joi_1.default.string().required(),
    tags: joi_1.default.array().items(joi_1.default.string().required()).required(),
    variants: joi_1.default.array().items(variantSchema).required(),
    inventory: inventorySchema.required(),
});
exports.default = productValidationSchema;
