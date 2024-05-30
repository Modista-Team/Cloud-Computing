import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./users.js";
import Products from "./products.js";

const Cart = db.define(
  "cart",
  {
    id_cart: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "cart",
    timestamps: false,
    underscored: true,
  }
);

db.sync();

Users.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(Users, { foreignKey: "user_id" });

Products.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Products, { foreignKey: "product_id" });

export default Cart;
