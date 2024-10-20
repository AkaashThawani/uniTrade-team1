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
});

console.log("Creating database connection to uniTrade dev")
connection.query(`CREATE DATABASE IF NOT EXISTS uniTrade_dev`, (err) => {
    if (err) throw err;
    console.log('Database uniTrade_dev created successfully');
  
    // Execute the schema.sql script
    connection.changeUser({ database: 'uniTrade_dev' }, (err) => {
      if (err) throw err;
      console.log('Switched to database uniTrade_dev.');
  
      console.log('Running schema...');
      // Splitting the schema into individual statements since it seems like mysql package is unable to parse them correctlt
      const statements = schema.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);
      (async () => {
        for (const stmt of statements) {
          try {
            console.log(`Executing: ${stmt}`);
            await connection.promise().query(stmt);
          } catch (err) {
            console.error('Error executing statement:', stmt);
            console.error(err);
            connection.end();
            return;
          }
        }
        console.log('Schema executed successfully.');
        connection.end();
      })();
    });
  });