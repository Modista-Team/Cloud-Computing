// controllers
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
// middleware
import validateToken from "../middleware/auth.js";
import {
  getAllProducts,
  getDetailProduct,
  searchProduct,
} from "../controllers/productsController.js";
import {
  addCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello World";
    },
  },
  {
    // Test endpoint yang perlu autentikasi
    method: "GET",
    path: "/protected",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: (req, h) => {
      return h
        .response({ message: "You have accessed a protected route!" })
        .code(200);
    },
  },
  {
    // register
    method: "POST",
    path: "/register",
    handler: authController.register,
  },
  {
    // login
    method: "POST",
    path: "/login",
    handler: authController.login,
  },
  {
    // logout
    method: "POST",
    path: "/logout",
    handler: authController.logout,
  },
  {
    // get user by id
    method: "GET",
    path: "/users/{user_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: userController.getUserById,
  },
  {
    // edit user address
    method: "PUT",
    path: "/users/address/{user_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: userController.updateUserAddress,
  },
  {
    // AllProduct
    method: "GET",
    path: "/products",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: getAllProducts,
  },
  {
    // Detail Produk by {id_product}
    method: "GET",
    path: "/products/{product_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: getDetailProduct,
  },
  {
    // Search Product
    method: "GET",
    path: "/search",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: searchProduct,
  },
  {
    // Detail Cart by {user_id}
    method: "GET",
    path: "/cart/{user_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: getCart,
  },
  {
    // Add data Cart
    method: "POST",
    path: "/cart/add",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: addCart,
  },
  {
    // Update Cart
    method: "PUT",
    path: "/cart/update/{cart_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: updateCart,
  },

  {
    method: "DELETE",
    path: "/cart/delete/{cart_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: deleteCart,
  },
  //   Order Routes
  {
    method: "POST",
    path: "/orders/add/{user_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.createOrder,
  },
  {
    // get semua order user
    method: "GET",
    path: "/orders/user/{user_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.getAllOrders,
  },
  {
    // get spesifik order
    method: "GET",
    path: "/orders/{order_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.getOrderById,
  },
];

export default routes;
