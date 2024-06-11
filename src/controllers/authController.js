import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Users from "../models/users.js";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const register = async (req, h) => {
  const { username, password, email, first_name, last_name, address, phone } =
    req.payload;

  if (!username || !password || !email || !first_name || !address || !phone) {
    return h.response({ error: "All fields are required" }).code(400);
  }

  if (!validator.isEmail(email)) {
    return h.response({ error: "Invalid email format" }).code(400);
  }

  if (!validator.isMobilePhone(phone, "any")) {
    return h.response({ error: "Invalid phone number" }).code(400);
  }

  try {
    const existingUsername = await Users.findOne({
      where: { username: username },
    });
    const existingEmail = await Users.findOne({ where: { email: email } });

    if (existingUsername) {
      return h.response({ error: "Username already exists" }).code(400);
    }

    if (existingEmail) {
      return h.response({ error: "Email already exists" }).code(400);
    }

    const user = await Users.create({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      first_name,
      last_name,
      address,
      phone,
    });
    return h
      .response({
        success: true,
        message: "User registered successfully",
        data: {
          id: user.user_id,
          username: user.username,
          password: user.password,
          email: user.email,
          fullName: `${user.first_name} ${user.last_name}`,
          address: user.address,
          phone: user.phone,
        },
      })
      .code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

const login = async (req, h) => {
  const { email, password } = req.payload;
  if (!email || !password) {
    return h.response({ error: "email and password are required" }).code(400);
  }
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return h.response({ error: "Invalid email or password" }).code(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return h.response({ error: "Invalid username or password" }).code(401);
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    return h
      .response({
        message: "Login successful",
        token: token,
        data: {
          id: user.user_id,
          username: user.username,
        },
      })
      .state("token", token)
      .code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: "Internal Server Error" }).code(500);
  }
};

// logout
const logout = async (req, h) => {
  return h
    .response({ message: "Logout successful" })
    .unstate("token")
    .code(200);
};

export default { register, login, logout };
