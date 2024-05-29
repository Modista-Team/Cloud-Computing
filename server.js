import Hapi from '@hapi/hapi';
import db from './src/config/db.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import Users from './src/models/users.js';

const secretKey = "123456";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.start();

  // Middleware untuk verifikasi JWT
  const validateToken = async (req, h) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return h
        .response({ error: "Authorization header missing" })
        .code(401)
        .takeover();
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secretKey);
      req.auth = { credentials: decoded };
      return h.continue;
    } catch (err) {
      return h.response({ error: "Invalid token" }).code(401).takeover();
    }
  };

  // Route dasar
  server.route({
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello World";
    },
  });

  // Route untuk mendapatkan data dari database
  server.route([
    {
      method: "GET",
      path: "/users",
      handler: async (req, h) => {
        try {
          const [rows] = await db.query("SELECT * FROM users");
          return h.response(rows).code(200);
        } catch (err) {
          console.error(err);
          return h.response({ error: "Internal Server Error" }).code(500);
        }
      },
    },
    {
      // login
      method: "POST",
  path: "/login",
  handler: async (req, h) => {
    const { username, password } = req.payload;
    if (!username || !password) {
      return h
        .response({ error: "Username and password are required" })
        .code(400);
    }
    try {
      const user = await Users.findOne({ where: { username } });

      if (!user) {
        return h
          .response({ error: "Invalid username or password" })
          .code(401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return h
          .response({ error: "Invalid username or password" })
          .code(401);
      }

      const token = jwt.sign(
        { id: user.id_user, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      return h.response({ message: "Login successful", token }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal Server Error" }).code(500);
    }
      },
    },
    {
      // register
      method: "POST",
      path: "/register",
      handler: async (req, h) => {
        const {
          username,
          password,
          email,
          first_name,
          last_name,
          address,
          phone,
        } = req.payload;

        // Validasi field yang diperlukan
        if (
          !username ||
          !password ||
          !email ||
          !first_name ||
          !address ||
          !phone
        ) {
          console.log("Missing field detected");
          return h.response({ error: "All fields are required" }).code(400);
        }

        // Validasi email
        if (!validator.isEmail(email)) {
          return h.response({ error: "Invalid email format" }).code(400);
        }

        // Validasi phone
        if (!validator.isMobilePhone(phone, "any")) {
          return h.response({ error: "Invalid phone number" }).code(400);
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const [result] = await db.query(
            "INSERT INTO users (username, password, email, first_name, last_name, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              username,
              hashedPassword,
              email,
              first_name,
              last_name,
              address,
              phone,
            ]
          );

          return h
            .response({ message: "User created", userId: result.insertId })
            .code(201);
        } catch (err) {
          console.error(err);
          return h.response({ error: "Internal Server Error" }).code(500);
        }
      },
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
  ]);

  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
