import { Sequelize } from "sequelize";
<<<<<<< HEAD
import db from "../config/db.js";
=======
import db from "../config/db";
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
import Users from "./users.js";
import Products from "./products.js";

const Cart = db.define(
  "cart",
  {
    id_cart: {
      primaryKey: true,
<<<<<<< HEAD
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
=======
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    quantity: {},
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
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

<<<<<<< HEAD
Users.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(Users, { foreignKey: "user_id" });

Products.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Products, { foreignKey: "product_id" });
=======
Users.hasMany(Cart, { foreignKey: "id_user" });
Cart.belongsTo(Users, { foreignKey: "id_user" });

Products.hasMany(Cart, { foreignKey: "id_product" });
Cart.belongsTo(Products, { foreignKey: "id_product" });
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698

export default Cart;
