import Joi from "joi";
// Define Joi schema for inventory
const inventorySchema = Joi.object({
  quantity: Joi.number().min(0).required(),
  inStock: Joi.boolean().required(),
});

// Define Joi schema for variants
const variantSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

// Define Joi schema for product
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()).required(),
  variants: Joi.array().items(variantSchema).required(),
  inventory: inventorySchema.required(),
});

export default productValidationSchema;
