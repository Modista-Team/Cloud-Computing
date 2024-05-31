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
    handler: getAllProducts,
  },
  {
    // Detail Produk by {id_product}
    method: "GET",
    path: "/products/{product_id}",
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
    path: "/cart/update/{cart_id}",
    handler: updateCart,
  },

  {
    method: "DELETE",
    path: "/cart/delete/{cart_id}",
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
    path: "/orders/{order_id}",
    options: {
      pre: [{ method: validateToken }],
    },
    handler: orderController.getOrderById,
  },

];

export default routes;
