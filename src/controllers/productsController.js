import Products from "../models/products.js";
import db from "../config/db.js";
import { Sequelize } from 'sequelize';

const getAllProducts = async (req, h) => {
  try {
    const products = await Products.findAll();
    return h.response(products).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

const getDetailProduct = async (req, h) => {
    try {
        const products = await Products.findByPk(req.params.product_id);
        if (!products) {
            return h.response({ error: "Product not found" }).code(404);
        }
        return h.response(products).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
}

const searchProduct = async (req, h) => {
    const { query } = req.query;

    try {
      const products = await Products.findAll({
        where: db.where(
            db.fn('concat', db.col('product_name'), ' ', db.col('description'), ' ', db.col('category_id')),
            {
                [Sequelize.Op.like]: `%${query}%`,
            }
        ),
    });
        return h.response(products).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
}

export { getAllProducts, getDetailProduct, searchProduct };