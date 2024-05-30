import { Sequelize } from "sequelize";
import  db from '../config/db.js';


const Categories = db.define('categories',{
    id_category: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull:true
    }
}, {
    tableName: 'categories',
    timestamps: false,
    underscored: true
});

export default Categories;