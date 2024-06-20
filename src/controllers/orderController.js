import Products from "../models/products.js";
import Orders from "../models/order.js";
import OrderItems from "../models/orderItems.js";
import db from "../config/db.js";


// method: "POST",
// path: "/orders/add/{user_id}"
const createOrder = async (req, h) => {
  const { items } = req.payload;
  const { user_id } = req.params;

  try {
    const result = await db.transaction(async (t) => {
      const order = await Orders.create(
        {
          user_id,
          total_amount: 0,
        },
        { transaction: t }
      );

      let totalAmount = 0;
      const products = [];

      const orderItemsPromises = items.map(async (item) => {
        const product = await Products.findByPk(item.product_id, {
          transaction: t,
        });

        if (!product) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }

        if (product.stock <= 0) {
          throw new Error(`Product ${product.product_name} is out of stock`);
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        product.stock -= item.quantity;
        await product.save({ transaction: t });

        products.push({
          product_name: product.product_name,
          quantity: item.quantity,
        });

        return OrderItems.create(
          {
            order_id: order.order_id,
            product_id: item.product_id,
            quantity: item.quantity,
            item_price: product.price,
            total_price: itemTotal,
          },
          { transaction: t }
        );
      });

      await Promise.all(orderItemsPromises);

      order.total_amount = totalAmount;
      await order.save({ transaction: t });

      return { order, products };
    });

    const responseData = {
      data: {
        order_id: result.order.order_id,
        user_id: result.order.user_id,
        total_amount: result.order.total_amount,
        products: result.products,
      },
    };

    return h.response(responseData).code(201);
  } catch (error) {
    console.error("Error placing order:", error);
    return h.response({ error: error.message }).code(500);
  }
};

// Get semua order berdasarkan id_user
// method: "GET",
// path: "/orders/user/{user_id}"
const getAllOrders = async (req, h) => {
  const { user_id } = req.params;
  try {
    const orders = await Orders.findAll({ where: { user_id } });
    return h.response(orders).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Get order by order_id
// method: "GET",
// path: "/orders/{order_id}"
const getOrderById = async (req, h) => {
  const { order_id } = req.params;

  try {
    const order = await Orders.findByPk(order_id);
    if (!order) {
      return h.response({ error: "Order not found" }).code(404);
    }

    return h.response(order).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
};
