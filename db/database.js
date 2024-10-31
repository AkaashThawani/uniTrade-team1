//manages connection pools
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST_DEV,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE_NAME,
//     port: process.env.MYSQL_PORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'SDPM',
    port:3306,
})

module.exports = pool.promise()