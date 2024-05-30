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

<<<<<<< HEAD
export default Categories;
=======

const defineRelationships = async () => {
    const { default: Products } = await import('./products.js');
    Categories.hasMany(Products, { foreignKey: 'id_category' });
    Products.belongsTo(Categories, { foreignKey: 'id_category' });
  };
  
  db.sync().then(async () => {
    await defineRelationships();
    console.log("Database synchronized and relationships defined");
  }).catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
  
  export default Categories;
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
