import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { BaseAttributes } from './base.model'

export interface ProductAttributes extends BaseAttributes {
  name: string;
  slug: string;
  sku: string;
  brandId: number;
}

export interface ProductModel extends Model<ProductAttributes>, ProductAttributes { }

export type ProductStatic = typeof Model & {
  new(values?: ProductModel, options?: BuildOptions): ProductModel;
};

export function ProductFactory(sequelize: Sequelize): ProductStatic {
  return <ProductStatic>sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}