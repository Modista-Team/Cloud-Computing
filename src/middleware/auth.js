import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


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

export default validateToken;
