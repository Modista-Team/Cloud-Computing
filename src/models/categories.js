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

const defineRelationships = async () => {
    const { default: Products } = await import('./products.js');
    Categories.hasMany(Products, { foreignKey: 'category_id' });
    Products.belongsTo(Categories, { foreignKey: 'category_id' });
};
  
  db.sync().then(async () => {
    await defineRelationships();
    console.log("Database synchronized and relationships defined");
  }).catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
  
export default Categories;
