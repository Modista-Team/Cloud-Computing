// controllers
import authController from "../controllers/authController.js";
import getAllUser from "../controllers/allUsers.js";
// middleware
import validateToken from "../middleware/auth.js";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello World";
    },
  },
  {
    // find alluser
    method: "GET",
    path: "/users",
    handler: getAllUser
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
      handler:authController.logout
    },
  {
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
];

export default routes;
