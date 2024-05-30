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

// get user detail
const getUserById = async (req, h) => {
  const { id_user } = req.params;

  try {
    const user = await Users.findByPk(id_user);

    if (!user) {
      return h.response({ message: "user not found" }).code(404);
    }

    return h
      .response({
        name: user.username,
        email: user.email,
        phone: user.phone,
      })
      .code(200);
  } catch (error) {
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// edit user address
const updateUserAddress = async (req, h) => {
  const { id_user } = req.params;
  const { address } = req.payload;

  try {
    const user = await Users.findByPk(id_user);

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    user.address = address;
    await user.save();

    return h.response({ success: true, message: "Address updated successfully",address:address }).code(200);
  } catch (error) {
    console.error("Error updating address:", error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

export default { getAllUser, getUserById,updateUserAddress };
