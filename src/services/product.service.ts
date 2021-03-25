import fs from 'fs'
import csv from 'csv-parser'
import { ProductAttributes, ProductModel } from "../models/product.model";
import { BaseService } from "./base.interface";

import ProductsDao from './../daos/products.dao'
import { Brand } from "../models";
import Logger from '../utils/logger';

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

  async bulkUpload(filePath: string): Promise<ProductModel[]> {
    const products = await this.readFromFile(filePath);
    const uploadedProducts = await ProductsDao.addManyProducts(products);
    fs.unlink(filePath, err => {
      if (err)
        Logger.error(err);
      else
        Logger.info("file deleted")
    });

    return uploadedProducts;
  }

  private readFromFile(filePath: string): Promise<ProductAttributes[]> {
    return new Promise((resolve, reject) => {
      const products: ProductAttributes[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row: ProductAttributes) => {
          products.push(row);
        })
        .on('end', () => {
          Logger.info('CSV file successfully processed');
          resolve(products);
        })
        .on('error', err => reject(err));
    });
  }
}

export default new ProductService();