import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD

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
=======
const secretKey = process.env.SECRET_KEY;
console.log('Secret Key:', secretKey); // Tambahkan ini untuk debugging

// Middleware untuk verifikasi JWT
const validateToken = async (req, h) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.state.token;
  
    if (!authHeader && !cookieToken) {
      return h
        .response({ error: 'Authorization header or token cookie missing' })
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
>>>>>>> a0b44e86ff03020acb3457a13468bcd7545f4698

export default validateToken;
