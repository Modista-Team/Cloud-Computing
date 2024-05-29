import { Sequelize } from "sequelize";
import  db from '../config/db';


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


db.sync();

Categories.hasMany(Products, { foreignKey: 'id_category' });
Products.belongsTo(Categories, { foreignKey: 'id_category' });

export default Categories;