import express from "express";
import productsService from "../services/product.service"
import { StatusCodes } from 'http-status-codes';
import { ProductModel } from "../models/product.model";

class ProductsController {
  async getAllProducts(req: express.Request, res: express.Response) {
    try {
      const products = await productsService.getAll();
      res.status(StatusCodes.OK).send(products);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when getting all products" });
    }
  }

  async getProductById(req: express.Request, res: express.Response) {
    try {
      let product: ProductModel;
      if (req.body.id) {
        product = await productsService.getById(parseInt(req.body.id));
      } else {
        product = await productsService.getBySlug(req.body.slug);
      }

      res.status(StatusCodes.OK).send(product);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when getting product" });
    }

  }

  async addProduct(req: express.Request, res: express.Response) {
    try {
      const product = await productsService.create(req.body);
      res.status(StatusCodes.OK).send(product);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when adding product" });
    }
  }

  async updateProduct(req: express.Request, res: express.Response) {
    try {
      const product = await productsService.update(parseInt(req.body.id), req.body);
      res.status(StatusCodes.CREATED).send(product);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when updating product" });
    }
  }

  async deleteProductById(req: express.Request, res: express.Response) {
    try {
      await productsService.deleteById(parseInt(req.body.id))
      res.status(StatusCodes.OK);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when deleting product" });
    }
  }
}

export default new ProductsController();