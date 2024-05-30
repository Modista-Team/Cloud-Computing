import { Sequelize } from "sequelize";
<<<<<<< HEAD
import  db from '../config/db';
=======
import  db from '../config/db.js';
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
import Users from "./users.js";

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

Users.hasMany(Orders,{foreignKey:'id_user'});
Orders.belongsTo(Users,{foreignKey:'id_user'});

export default Orders;