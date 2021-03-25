import express from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ErrorDto } from '../dtos/error.dto';

class ProductsMiddleware {
  /**
   * Adds product id to body
   * @param req Express request object
   * @param res Express response object
   * @param next Next execution on the pipeline
   */
  async parseProductId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.productId;
    next();
  }

  /**
   * Checks if the product is parameters is the product id or the slug.
   * @param req Express request object
   * @param res Express response object
   * @param next Next execution on the pipeline
   */
  async checkifSlug(req: express.Request, res: express.Response, next: express.NextFunction) {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        req.body.slug = req.params.productId;
        return next()
      } else {
        const extractedErrors = new ErrorDto();
        errors.array().map(err => extractedErrors.errors.push(err.msg))

        return res.status(StatusCodes.NOT_ACCEPTABLE).send(extractedErrors)
      }
    } else {
      req.body.id = productId;
    }

    next();
  }

  /**
   * Validates if a file is avaialble with the request.
   * @param req Express request object
   * @param res Express response object
   * @param next Next execution on the pipeline
   */
  async validateFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.files.length == 0) {
      const errorDto = new ErrorDto();
      errorDto.errors.push('Please upload a CSV file!');
      res.status(StatusCodes.NOT_ACCEPTABLE).send(errorDto);
    }

    next();
  }
}

export default new ProductsMiddleware();