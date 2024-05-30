import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Categories from "./categories.js";

const Products = db.define(
  "products",
  {
    id_product: {
<<<<<<< HEAD
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
=======
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
=======
    // created_at: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.NOW
    // },
    // updated_at: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.NOW
    // }
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
  },
  {
    tableName: "products",
    timestamps: false,
    underscored: true,
  }
);

<<<<<<< HEAD
db.sync();

Categories.hasMany(Products, { foreignKey: "category_id" });
Products.belongsTo(Categories, { foreignKey: "category_id" });

=======

Categories.hasMany(Products, { foreignKey: "id_category" });
Products.belongsTo(Categories, { foreignKey: "id_category" });
db.sync();

>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698
export default Products;
