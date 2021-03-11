import express from "express";
import { StatusCodes } from "http-status-codes";

class ProductsMiddleware {
  async validateProductId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid id' });
    } else {
      req.body.id = productId;
      next();
    }
  }

  async checkifSlug(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(req);
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      req.body.slug = req.params.productId;
    } else {
      req.body.id = productId;
    }

    next();
  }
}

export default new ProductsMiddleware();