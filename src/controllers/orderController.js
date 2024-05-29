import Users from "../models/users.js";
import Products from "../models/products.js";
import Orders from "../models/order.js";

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
  try {
    const orders = await Orders.findAll();
    return h.response(orders).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// Get order by ID
const getOrderById = async (req, h) => {
  const { id } = req.params;

  try {
    const order = await Orders.findByPk(id);
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
  const { id } = req.params;
  const { status } = req.payload;

  try {
    const order = await Orders.findByPk(id);
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
  const { id } = req.params;

  try {
    const order = await Orders.findByPk(id);
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
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
