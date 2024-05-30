import Users from "../models/users.js";
import Products from "../models/products.js";
import Orders from "../models/order.js";
import OrderItems from '../models/orderItems.js';


// Checkout
const checkout = async (req, h) => {
  const { id_user } = req.params;

  try {
    const cartItems = await Cart.findAll({ where: { id_user: id_user } });

    if (!cartItems.length) {
      return h.response({ message: "Cart is empty" }).code(404);
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.quantity * item.product_price), 0);

    const newOrder = await Orders.create({
      id_user: id_user,
      total_amount: totalAmount,
      // status: 'Belum Lunas',
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


    await Cart.destroy({ where: { id_user: id_user } });

    return h.response({ message: "Checkout successful", order_id: newOrder.id_order }).code(200);
  } catch (error) {
    console.error('Error during checkout:', error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

const createOrder = async (req, h) => {
    const { total_amount, status } = req.payload;
    const { id: id_user } = req.auth.credentials;  
  
    try {
      const user = await Users.findByPk(id_user);
      if (!user) {
        return h.response({ error: "User not found" }).code(404);
      }
  
      const order = await Orders.create({
        id_user,
        total_amount,
        status,
      });
  
      return h.response(order).code(201);
    } catch (err) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  };

// Get all orders
const getAllOrders = async (req, h) => {
  const {id_user} = req.params;
  try {
    const orders = await Orders.findAll({where: {id_user}});
    return h.response(orders).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Get order by ID
const getOrderById = async (req, h) => {
  const { id_order } = req.params;

  try {
    const order = await Orders.findByPk(id_order);
    if (!order) {
      return h.response({ error: "Order not found" }).code(404);
    }

    return h.response(order).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Update order
const updateOrder = async (req, h) => {
  const { id_order } = req.params;
  const { status } = req.payload;

  try {
    const order = await Orders.findByPk(id_order);
    if (!order) {
      return h.response({ error: "Order not found" }).code(404);
    }

    order.status = status;
    await order.save();

    return h.response(order).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Delete order
const deleteOrder = async (req, h) => {
  const { id_order } = req.params;

  try {
    const order = await Orders.findByPk(id_order);
    if (!order) {
      return h.response({ error: "Order not found" }).code(404);
    }

    await order.destroy();
    return h.response({ message: "Order deleted successfully" }).code(200);
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
  updateOrder,
  deleteOrder,
};
