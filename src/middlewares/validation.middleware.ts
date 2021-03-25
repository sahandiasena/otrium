import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ErrorDto } from '../dtos/error.dto';

class ValidationMiddleware {
  productModelValidationRules = () => {
    return [
      body('name').notEmpty().withMessage('Name required.'),
      body('slug').notEmpty().withMessage('Slug required.'),
      body('slug').isSlug().withMessage('Invalid slug.'),
      body('sku').notEmpty().withMessage('SKU required.'),
      body('brandId').notEmpty().withMessage('BrandId required.'),
      body('brandId').isInt().withMessage('Invalid brand Id.'),
    ]
  }

  slugValidationRules = () => {
    return [
      param('productId').isSlug().withMessage('Invalid slug.')
    ]
  }

  productIdValidationRules = () => {
    return [
      param('productId').isInt().withMessage('Invalid product id.')
    ]
  }

  validateProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const extractedErrors = new ErrorDto();
    errors.array().map(err => extractedErrors.errors.push(err.msg))

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(extractedErrors)
  }
}

export default new ValidationMiddleware();