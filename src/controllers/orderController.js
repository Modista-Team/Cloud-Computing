import Users from "../models/users.js";
import Products from "../models/products.js";
import Orders from "../models/order.js";
import OrderItems from '../models/orderItems.js';
import db from "../config/db.js";


// Checkout
const checkout = async (req, h) => {
  const { user_id } = req.params;

  try {
    const cartItems = await Cart.findAll({ where: { user_id: user_id } });

    if (!cartItems.length) {
      return h.response({ message: "Cart is empty" }).code(404);
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.quantity * item.product_price), 0);

    const newOrder = await Orders.create({
      user_id: user_id,
      total_amount: totalAmount,
      created_at: new Date()
    });

    // Create order items
    for (const item of cartItems) {
      await OrderItems.create({
        id_order: newOrder.id_order,
        id_product: item.product_id,
        quantity: item.quantity
      });
    }


    await Cart.destroy({ where: { user_id: user_id } });

    return h.response({ message: "Checkout successful", order_id: newOrder.id_order }).code(200);
  } catch (error) {
    console.error('Error during checkout:', error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};


const createOrder = async (req, h) => {
  const { items } = req.payload;
  const { id: user_id } = req.auth.credentials; 

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

      const orderItemsPromises = items.map(async (item) => {
        const product = await Products.findByPk(item.product_id, { transaction: t });

        if (!product) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }

        if (product.stock <= 0) {
          throw new Error(`Product ${product.product_name} is out of stock`);
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        // Kurangi jumlah stok produk
        product.stock -= item.quantity;
        await product.save({ transaction: t });

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

      return order;
    });
    console.log(result);
    return h.response({result}).code(201);

  } catch (error) {
    console.error("Error placing order:", error);
    return h.response({ error: error.message }).code(500);
  }
};

// Get all orders
const getAllOrders = async (req, h) => {
  const {user_id} = req.params;
  try {
    const orders = await Orders.findAll({where: {user_id}});
    return h.response(orders).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Get order by ID
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
  checkout,
  createOrder,
  getAllOrders,
  getOrderById,
};
