const dotenv = require("dotenv");
const { Pool } = require("pg");
const fs = require('fs');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('./prod-ca-2021.crt').toString(), 
    }
});

module.exports = pool;
