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
import {addCart,deleteCart,getCart,updateCart} from "../controllers/cartController.js";
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
    // get user by id
    method: "GET",
    path: "/users/{id_user}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: userController.getUserById,
  },
  {
    // edit user address
    method: "PUT",
    path: "/users/address/{id_user}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: userController.updateUserAddress,
  },
  {
    // AllProduct
    method: "GET",
    path: "/products",
    handler: getAllProducts,
  },
  {
    // Detail Produk by {id_product}
    method: "GET",
    path: "/products/{id_product}",
    handler: getDetailProduct,
  },
  {
    // Search Product
    method: "GET",
    path: "/search",
    handler: searchProduct,
  },
  {
    // Detail Cart by {user_id}
    method: "GET",
    path: "/cart/{user_id}",
    handler: getCart,
  },
  {
    // Add data Cart
    method: "POST",
    path: "/cart/add",
    handler: addCart,
  },
  {
    // Update Cart
    method: "PUT",
    path: "/cart/update/{id_cart}",
    handler: updateCart,
  },

  {
    method: "DELETE",
    path: "/cart/delete/{id_cart}",
    handler: deleteCart,
  },
  //   Order Routes
  {
    method: "POST",
    path: "/orders/add",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.createOrder,
  },
  {
    method: "GET",
    path: "/orders",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.getAllOrders,
  },
  {
    method: "GET",
    path: "/orders/{id_order}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.getOrderById,
  },
  {
    method: "PUT",
    path: "/orders/update/{id_cart}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.updateOrder,
  },
  {
    method: "DELETE",
    path: "/orders/delete/{id_cart}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.deleteOrder,
  },
];

export default routes;
