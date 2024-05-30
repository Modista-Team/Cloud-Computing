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

Products.hasMany(OrderItems, { foreignKey: 'id_product' });
OrderItems.belongsTo(Products, { foreignKey: 'id_product' });

Orders.hasMany(OrderItems, { foreignKey: 'id_order' });
OrderItems.belongsTo(Orders, { foreignKey: 'id_order' });

export default OrderItems;