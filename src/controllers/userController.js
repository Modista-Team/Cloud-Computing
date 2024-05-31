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
  const { user_id } = req.params;

  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return h.response({ message: "user not found" }).code(404);
    }

    return h
      .response({
        id: user.user_id,
        name: user.username,
        email: user.email,
        pass: user.password,
        phone: user.phone,
        alamat: user.address,
      })
      .code(200);
  } catch (error) {
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// edit user address
const updateUserAddress = async (req, h) => {
  const { user_id } = req.params;
  const { address } = req.payload;

  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return h.response({ message: "User not found" }).code(404);
    }

    user.address = address;
    await user.save();

    return h
      .response({
        success: true,
        message: "Address updated successfully",
        data: {
          id: user.user_id,
          username: user.username,
          address: user.address,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Error updating address:", error);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

export default { getAllUser, getUserById, updateUserAddress };
