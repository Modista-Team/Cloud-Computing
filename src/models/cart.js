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

Users.hasMany(Cart, { foreignKey: "id_user" });
Cart.belongsTo(Users, { foreignKey: "id_user" });

Products.hasMany(Cart, { foreignKey: "id_product" });
Cart.belongsTo(Products, { foreignKey: "id_product" });

export default Cart;
