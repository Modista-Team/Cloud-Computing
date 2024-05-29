import bcrypt from 'bcrypt';
import Users from '../models/users';
import jwt from 'jsonwebtoken';
import validator from 'validator';


const register = async (req,h)=>{
    const {
        username,
        password,
        email,
        first_name,
        last_name,
        address,
        phone,
      } = req.payload;

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

      // Validasi field yang diperlukan
    if (!username ||!password ||!email ||!first_name ||!address ||!phone) {
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
        const existingUsername = await Users.findOne({where:username});
        const existingEmail = await Users.findOne({where:email})

        if(existingUsername){
            return h.response({error:'Username already exist'}).code(400);
        }

        if(existingEmail){
            return h.response({error:'Email already exist'}).code(400);
        }

        await Users.create({
        username,
        password:bcrypt.hashSync(password,10),
        email,
        first_name,
        last_name,
        address,
        phone,
        });
        return h.response({message:'User register successfuly'}).code(201);
        
      } catch (err) {
        console.error(err);
          return h.response({ error: "Internal Server Error" }).code(500);
      }

}