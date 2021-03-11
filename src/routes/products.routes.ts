import express from "express";
import { CommonRoutesConfig } from "./common.routes";
import ProductsController from "../controllers/products.controller"
import productsMiddleware from "../middlewares/products.middleware";
import multer from "multer";

export class ProductsRoutes extends CommonRoutesConfig {
  upload: multer.Multer;

  constructor(app: express.Application) {
    super(app);
  }

  configureRoutes(): express.Application {
    this.app.route(`/products`)
      .get(ProductsController.getAllProducts)
      .post(ProductsController.addProduct)

    this.app.route(`/products/upload`)
      .post(ProductsController.bulkUpload);

    this.app.route(`/products/:productId`)
      .get(
        productsMiddleware.checkifSlug,
        ProductsController.getProductById)
      .put(
        productsMiddleware.validateProductId,
        ProductsController.updateProduct)
      .delete(
        productsMiddleware.validateProductId,
        ProductsController.deleteProductById);

    return this.app;
  }
}