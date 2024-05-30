import Users from "../models/users.js";

const getAllUser = async (req, h) => {
  try {
    const users = await Users.findAll();
    return h.response(users).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

export default getAllUser;