import express from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ErrorDto } from "../dtos/error.dto";

class ProductsMiddleware {
  async validateProductId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      res.status(StatusCodes.BAD_REQUEST).send(new ErrorDto('Invalid id'));
    } else {
      req.body.id = productId;
      next();
    }
  }

  async checkifSlug(req: express.Request, res: express.Response, next: express.NextFunction) {
    var slugRegex = new RegExp("\W|_");
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      var slug = req.params.productId;
      if (!slugRegex.test(slug)) {
        req.body.slug = slug;
      } else {
        res.status(StatusCodes.BAD_REQUEST).send(new ErrorDto('Invalid slug'));
      }
    } else {
      req.body.id = productId;
    }

    next();
  }

  async validateFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.files.length == 0) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send(new ErrorDto("Please upload a CSV file!"));
    }

    next();
  }

  productValidationRules = () => {
    return [
      body('name').notEmpty(),
      body('slug').notEmpty().isSlug(),
      body('sku').notEmpty(),
      body('brandId').notEmpty(),
    ]
  }

  validateProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: extractedErrors,
    })
  }
}

export default new ProductsMiddleware();