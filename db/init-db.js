const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

console.log("init-db.js is running");

// Load schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Directly specify the DATABASE_URL
const connectionString = 'postgresql://unitrade_user:pU4nYcB6thLOZRF1yrvpoTB1z5nxj7Mm@dpg-csp9019u0jms73bh5c30-a.oregon-postgres.render.com:5432/unitrade';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: true, // Ensure the server's certificate is verified
  }
});

// Connect to PostgreSQL server
client.connect()
  .then(async () => {
    console.log("Connected to PostgreSQL server.");

    console.log('Running schema...');
    // Split schema into individual statements
    const statements = schema.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

    // Execute each statement
    for (const stmt of statements) {
      try {
        console.log(`Executing: ${stmt}`);
        await client.query(stmt);
      } catch (err) {
        console.error('Error executing statement:', stmt);
        console.error(err);
        await client.end();
        return;
      }
    }

    console.log('Schema executed successfully.');
    await client.end();
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
    client.end();
  });
``
