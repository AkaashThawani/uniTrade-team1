const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path')

dotenv.config()
// Adjust schemaPath accordingly if schema.sql is moved from fb folder
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
//Connect to MySQL db (note that it is initially connecting to dev environment)
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST_DEV,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_DEV
});

connection.query(`CREATE DATABASE IF NOT EXISTS uniTrade_dev`, (err) => {
    if (err) throw err;
    console.log('Database uniTrade_dev created successfully');
  
    // Execute the schema.sql script
    connection.changeUser({ database: 'uniTrade_dev' }, (err) => {
      if (err) throw err;
  
      connection.query(schema, (err) => {
        if (err) throw err;
        console.log('Tables created successfully.');
        connection.end();
      });
    });
  });