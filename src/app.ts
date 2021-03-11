import dotenv from 'dotenv'
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import express from 'express';
import { buildSchema } from 'type-graphql';
dotenv.config();

import { sequelize } from './models';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductsRoutes } from './routes/products.routes';

async function main() {
  sequelize
    .sync()
    .then(() => console.info("connected to db"))
    .catch(err => {
      console.error(err);
      throw "error";
    });

  const app = express();
  const port = process.env.PORT || 3000;
  const upload = multer({ dest: process.env.UPLOAD_PATH })

  const schema = await buildSchema({
    resolvers: [ProductResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(upload.any());

  new ProductsRoutes(app);

  app.get('/', (req, res) => {
    res.send('Welcome to otrium!!');
  });

  app.listen(port, () => {
    return console.log(`server is listening on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

main();