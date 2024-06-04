import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
  dialect:'mysql',
  host:process.env.DB_HOST,
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` 
  }
})

export default db;