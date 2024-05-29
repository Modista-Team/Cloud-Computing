import { Sequelize } from "sequelize";
import  db from '../config/db';
import Products from "./products";
import Orders from "./order";

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
    tableName: 'order_items',
    timestamps: false,
    underscored: true
});

db.sync();

Products.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Products, { foreignKey: 'product_id' });

Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

export default OrderItems;