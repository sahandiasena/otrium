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

      if (product) {
        res.status(StatusCodes.OK).send(product);
      } else {
        res.status(StatusCodes.NO_CONTENT).send();
      }

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

  async bulkUpload(req: express.Request, res: express.Response) {
    try {
      if (req.files.length == 0) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please upload a CSV file!");
      }

      const filePath = `${process.env.UPLOAD_PATH}/${req.files[0].filename}`
      const uploadedProducts = await productsService.bulkUpload(filePath);

      res.status(StatusCodes.OK).send(uploadedProducts);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error when uploading products" });
    }
  }
}

export default new ProductsController();