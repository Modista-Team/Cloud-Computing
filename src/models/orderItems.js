import { Sequelize } from "sequelize";
import  db from '../config/db.js';
import Products from "./products.js";
import Orders from "./order.js";

const OrderItems = db.define('orderitems', {
    id_order_item: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orderitems',
    timestamps: false,
    underscored: true
});

db.sync();

Products.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Products, { foreignKey: 'product_id' });

Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

export default OrderItems;