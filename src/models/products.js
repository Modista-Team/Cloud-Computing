import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Categories from "./categories.js";

const Products = db.define(
  "products",
  {
    id_product: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
    // created_at: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.NOW
    // },
    // updated_at: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.NOW
    // }
  },
  {
    tableName: "products",
    timestamps: false,
    underscored: true,
  }
);


Categories.hasMany(Products, { foreignKey: "id_category" });
Products.belongsTo(Categories, { foreignKey: "id_category" });
db.sync();

export default Products;
