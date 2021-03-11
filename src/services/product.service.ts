import { ProductAttributes, ProductModel } from "../models/product.model";
import { BaseService } from "./base.interface";

import ProductsDao from './../daos/products.dao'
import { Brand } from "../models";

class ProductService implements BaseService<ProductModel, ProductAttributes> {
  async getAll(): Promise<ProductModel[]> {
    return ProductsDao.getProducts();
  }

  async create(product: ProductAttributes): Promise<ProductModel> {
    return ProductsDao.addProduct(product);
  }

  async update(productId: number, product: ProductAttributes): Promise<ProductModel> {
    await ProductsDao.updateProductById(productId, product);
    const updatedProduct = ProductsDao.getProductById(product.id);
    return updatedProduct;
  }

  async getById(id: number): Promise<ProductModel> {
    return ProductsDao.getProductById(id);
  }

  async getBySlug(slug: string): Promise<ProductModel> {
    return ProductsDao.getProduct({ where: { slug: slug }, include: Brand });
  }

  async deleteById(id: number): Promise<void> {
    await ProductsDao.deleteProductById(id);
  }
}

export default new ProductService();