import express from "express";
import productsService from "../services/product.service"
import { StatusCodes } from 'http-status-codes';
import { ProductModel } from "../models/product.model";
import { ErrorDto } from "../dtos/error.dto";

/**
 * API endpoints related to product operations.
 */
class ProductsController {
  /**
   * Returns all products
   * @param req Express request instance
   * @param res Express respinse instance
   */
  async getAllProducts(req: express.Request, res: express.Response) {
    try {
      const products = await productsService.getAll();
      res.status(StatusCodes.OK).send(products);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when getting all products"));
    }
  }

  /**
   * Returns product belongs to the provided product id.
   * @param req Express request instance
   * @param res Express respinse instance
   */
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
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when getting product"));
    }

  }

  /**
   * Saves provided product.
   * @param req Express request instance
   * @param res Express respinse instance
   */
  async addProduct(req: express.Request, res: express.Response) {
    try {
      const product = await productsService.create(req.body);
      res.status(StatusCodes.CREATED).send(product);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when adding product"));
    }
  }

  /**
   * Updates product by product id.
   * @param req Express request instance
   * @param res Express respinse instance
   */
  async updateProduct(req: express.Request, res: express.Response) {
    try {
      const product = await productsService.update(parseInt(req.body.id), req.body);
      res.status(StatusCodes.CREATED).send(product);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when updating product"));
    }
  }

  /**
   * Deletes product by product id.
   * @param req Express request instance
   * @param res Express respinse instance
   */
  async deleteProductById(req: express.Request, res: express.Response) {
    try {
      await productsService.deleteById(parseInt(req.body.id))
      res.status(StatusCodes.OK);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when deleting product"));
    }
  }

  /**
   * Uploads multiple products provided in a CSV file.
   * @param req Express request instance
   * @param res Express respinse instance
   */
  async bulkUpload(req: express.Request, res: express.Response) {
    try {
      const filePath = `${process.env.UPLOAD_PATH}/${req.files[0].filename}`
      const uploadedProducts = await productsService.bulkUpload(filePath);

      res.status(StatusCodes.OK).send(uploadedProducts);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorDto("Error when uploading products"));
    }
  }
}

export default new ProductsController();