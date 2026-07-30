import { ProductModel } from "./product.model";

export async function getProducts(category?: string) {
  const query = category ? { category } : {};
  return ProductModel.find(query).lean();
}
