import { z } from "zod";
const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  inStock: z.boolean()
});

// Define the Zod schema for the Variant
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string()
});

// Define the Zod schema for the Product
const productValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string()).nonempty("Tags array must have at least one tag"),
  variants: z.array(variantValidationSchema).nonempty("Variants array must have at least one variant"),
  inventory: inventoryValidationSchema
});

export default productValidationSchema;
