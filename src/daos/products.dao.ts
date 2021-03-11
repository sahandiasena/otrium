import { FindOptions, UpdateOptions } from "sequelize/types";
import { Brand, Product } from "../models";
import { ProductAttributes, ProductModel } from "../models/product.model";

class ProductsDao {
  async getProducts(findOptions?: FindOptions<ProductAttributes>): Promise<ProductModel[]> {
    if (!findOptions) {
      findOptions = { include: Brand }
    }
    return Product.findAll(findOptions);
  }

  async getProductById(id: number): Promise<ProductModel> {
    return Product.findByPk(id, { include: Brand });
  }

  async getProduct(findOptions: FindOptions<ProductAttributes>): Promise<ProductModel> {
    return Product.findOne(findOptions);
  }

  async addProduct(product: ProductAttributes): Promise<ProductModel> {
    return Product.create(product);
  }

  async updateProductById(productId: number, product: ProductAttributes): Promise<void> {
    await Product.update(product, { where: { id: productId } });
  }

  async updateProduct(product: ProductAttributes, updateOptions: UpdateOptions<ProductAttributes>): Promise<void> {
    await Product.update(product, updateOptions);
  }

  async deleteProductById(id: number): Promise<void> {
    await Product.destroy({ where: { id: id } });
  }

  async addManyProducts(products: ProductAttributes[]): Promise<ProductModel[]> {
    return Product.bulkCreate(products);
  }
}

export default new ProductsDao();