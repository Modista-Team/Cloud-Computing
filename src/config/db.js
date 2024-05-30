// import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize('modista','root','',{
  dialect:'mysql',
  host:'localhost'
})

export default db;