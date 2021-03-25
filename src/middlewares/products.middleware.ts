import express from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ErrorDto } from '../dtos/error.dto';

class ProductsMiddleware {
  async parseProductId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.productId;
    next();
  }

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