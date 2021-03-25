import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { BaseAttributes } from './base.model';

interface BrandAttribute extends BaseAttributes {
  name: string;
  description: string;
}

interface BrandModel extends Model<BrandAttribute>, BrandAttribute { }

type BrandStatic = typeof Model & {
  new(values?: BrandModel, options?: BuildOptions): BrandModel;
};

export function BrandFactory(sequelize: Sequelize): BrandStatic {
  return <BrandStatic>sequelize.define('brand', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });
}
