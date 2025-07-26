import { z } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  stock: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://api.vercel.app/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return z.array(ProductSchema).parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.issues);
    } else {
      console.error("Error fetching products:", error);
    }
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const products = await getProducts();
    return Array.from(new Set(products.map((product) => product.category)));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
