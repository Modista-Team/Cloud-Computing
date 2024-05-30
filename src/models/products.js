import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Categories from "./categories.js";

const Products = db.define(
  "products",
  {
    id_product: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
  },
  {
    tableName: "products",
    timestamps: false,
    underscored: true,
  }
);

db.sync();

Categories.hasMany(Products, { foreignKey: "category_id" });
Products.belongsTo(Categories, { foreignKey: "category_id" });

export default Products;
