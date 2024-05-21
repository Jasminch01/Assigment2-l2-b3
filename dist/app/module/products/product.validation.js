"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be a non-negative number"),
    inStock: zod_1.z.boolean()
});
// Define the Zod schema for the Variant
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
// Define the Zod schema for the Product
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    description: zod_1.z.string().nonempty("Description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.string().nonempty("Category is required"),
    tags: zod_1.z.array(zod_1.z.string()).nonempty("Tags array must have at least one tag"),
    variants: zod_1.z.array(variantValidationSchema).nonempty("Variants array must have at least one variant"),
    inventory: inventoryValidationSchema
});
exports.default = productValidationSchema;
