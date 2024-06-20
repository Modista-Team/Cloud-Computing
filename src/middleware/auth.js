import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

// Middleware untuk verifikasi JWT
const validateToken = async (req, h) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.state.token;
  
    if (!authHeader && !cookieToken) {
      return h
        .response({ error: 'Login Terlebih dahulu' })
        .code(401)
        .takeover();
    }
  
    const token = authHeader ? authHeader.split(' ')[1] : cookieToken;
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.auth = { credentials: decoded };
      return h.continue;
    } catch (err) {
      return h.response({ error: 'Invalid token' }).code(401).takeover();
    }
  };

export default validateToken;
