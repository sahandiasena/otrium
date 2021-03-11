import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { sequelize } from './models';
import { ProductsRoutes } from './routes/products.routes';

sequelize
  .sync()
  .then(() => console.info("connected to db"))
  .catch(err => {
    console.error(err);
    throw "error";
  });

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

new ProductsRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to otrium!!');
});

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});