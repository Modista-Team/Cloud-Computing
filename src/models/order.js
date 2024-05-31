import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./users.js";

const Orders = db.define(
  "orders",
  {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    total_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
    underscored: true,
  }
);

db.sync();

Users.hasMany(Orders, { foreignKey: "user_id" });
Orders.belongsTo(Users, { foreignKey: "user_id" });

export default Orders;
