// import mysql from 'mysql2/promise';
import {Sequelize, DataTypes} from 'sequelize';

const db = new Sequelize('modista','root','',{
    dialect:'mysql',
    host:'localhost'
})






// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'modista'
// });
export default db;

// export default dbConnect;
