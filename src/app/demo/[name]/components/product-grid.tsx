import ProductGrid from "@/components/product-grid";
import { getCategories, getProducts } from "@/lib/products";

const products = await getProducts();
const categories = await getCategories();

export const productGrid = {
  name: "product-grid",
  components: {
    Default: <ProductGrid products={products} categories={categories} />,
  },
};
