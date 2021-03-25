import express from 'express';
import { CommonRoutesConfig } from './common.routes';
import ProductsController from '../controllers/products.controller'
import productsMiddleware from '../middlewares/products.middleware';
import multer from 'multer';
import validationMiddleware from '../middlewares/validation.middleware';

export class ProductsRoutes extends CommonRoutesConfig {
  upload: multer.Multer;

  constructor(app: express.Application) {
    super(app);
  }

  configureRoutes(): express.Application {
    this.app.route('/products')
      .get(ProductsController.getAllProducts)
      .post(
        validationMiddleware.productModelValidationRules(),
        validationMiddleware.validateProduct,
        ProductsController.addProduct)

    this.app.route('/products/upload')
      .post(
        productsMiddleware.validateFile,
        ProductsController.bulkUpload);

    this.app.route('/products/:productId')
      .get(
        validationMiddleware.slugValidationRules(),
        productsMiddleware.checkifSlug,
        ProductsController.getProductById)
      .put(
        validationMiddleware.productIdValidationRules(),
        productsMiddleware.parseProductId,
        validationMiddleware.productModelValidationRules(),
        validationMiddleware.validateProduct,
        ProductsController.updateProduct)
      .delete(
        validationMiddleware.productIdValidationRules(),
        productsMiddleware.parseProductId,
        ProductsController.deleteProductById);

    return this.app;
  }
}