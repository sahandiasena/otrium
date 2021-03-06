import dotenv from 'dotenv'
import 'reflect-metadata';
import { ApolloServer, ValidationError } from 'apollo-server-express';
import cors from 'cors';
import multer from 'multer';
import express, { Application } from 'express';
import { buildSchema } from 'type-graphql';
dotenv.config();

import { sequelize } from './models';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductsRoutes } from './routes/products.routes';
import { GraphQLError } from 'graphql';
import Logger from './utils/logger';

export const app: Application = express();

async function main() {
  sequelize
    .sync()
    .then(() => Logger.info('connected to db'))
    .catch(err => {
      Logger.error(err);
      throw 'error';
    });

  const port = process.env.PORT || 3000;
  const upload = multer({ dest: process.env.UPLOAD_PATH })

  const schema = await buildSchema({
    resolvers: [ProductResolver],
  });

  const server = new ApolloServer({
    schema,
    formatError: (err) => {
      Logger.error(err);
      if (err instanceof ValidationError) {
        return new GraphQLError(err.message);
      } else if (err.originalError['response'] != null) {
        const res = err.originalError['response'];
        return new GraphQLError(res.data.errors);
      } else {
        return err;
      }
    }
  });

  server.applyMiddleware({ app })

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(upload.any());

  new ProductsRoutes(app);

  app.get('/', (req, res) => {
    res.send('Welcome to otrium!!');
  });

  app.listen(port, () => {
    return Logger.info(`server is listening on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

main();