import { Sequelize } from "sequelize";
import  db from '../config/db';
import Users from "./users";

const Orders = db.define('orders', {
    id_order: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Belum Lunas', 'Lunas'),  
        allowNull: false,
        defaultValue: 'Belum Lunas' 
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'orders',
    timestamps: false,
    underscored: true
});

db.sync();

Users.hasMany(Orders,{foreignKey:'user_id'});
Orders.belongsTo(Users,{foreignKey:'user_id'});

export default Orders;