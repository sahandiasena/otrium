import { Sequelize } from 'sequelize';
import { BrandFactory } from './brand.model';
import { ProductFactory } from './product.model';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  port: Number(process.env.DB_PORT) || 3306,
  host: process.env.DB_HOST || "localhost",
  dialect: 'mysql'
});

export const Product = ProductFactory(sequelize);
export const Brand = BrandFactory(sequelize);

Brand.hasMany(Product);
Product.belongsTo(Brand);