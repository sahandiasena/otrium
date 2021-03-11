import axios from "axios";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductModel } from "../models/product.model";
import { Product, ProductInput } from "../typedefs/types/product";

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts(): Promise<ProductModel[]> {
    const res = await axios.get(`${baseUrl}/products`);
    return await res.data;
  }

  @Mutation(() => Product)
  async addProduct(@Arg('newProduct') newProduct: ProductInput): Promise<ProductModel> {
    const res = await axios.post(`${baseUrl}/products`, newProduct);
    return await res.data
  }
}