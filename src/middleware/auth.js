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
        .response({ error: '' })
        .code(401)
        .takeover();
    }
  
    const token = authHeader ? authHeader.split(' ')[1] : cookieToken;
    console.log('Token:', token); // Debugging line
  
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Decoded Token:', decoded); // Debugging line
      req.auth = { credentials: decoded };
      return h.continue;
    } catch (err) {
      console.log('Token Error:', err.message); // Debugging line
      return h.response({ error: 'Invalid token' }).code(401).takeover();
    }
  };

export default validateToken;
