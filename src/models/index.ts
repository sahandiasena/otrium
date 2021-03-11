import { Sequelize } from 'sequelize';
import { BrandFactory } from './brand.model';
import { ProductFactory } from './product.model';

export const sequelize = new Sequelize(
  'otrium',
  'root',
  '0tr1um', {
  port: Number(process.env.DB_PORT) || 3306,
  host: process.env.DB_HOST || "localhost",
  dialect: 'mysql'
});

export const Product = ProductFactory(sequelize);
export const Brand = BrandFactory(sequelize);

Brand.hasMany(Product);
Product.belongsTo(Brand);