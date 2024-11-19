// //manages connection pools
// const dotenv = require("dotenv");
// dotenv.config();
// const mysql = require('mysql2');

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

// module.exports = pool.promise()

const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'uniTrade_dev',
    port: process.env.DB_PORT || 5432,
    ssl: { rejectUnauthorized: false }, // Required for Render PostgreSQL
});

module.exports = pool;
