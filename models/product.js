import { DataTypes } from "sequelize";
import sequelize from "../db.js";
const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    productViewed: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    updatedDate: DataTypes.DATE,
    deletedDate: DataTypes.DATE,
  },
  { freezeTableName: true, timestamps: false }
);

export default Product;
