import { Sequelize } from "sequelize";
import db from "../config/db";
import Users from "./users";
import Products from "./products";

const Cart = db.define(
  "cart",
  {
    id_cart: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    quantity: {},
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
