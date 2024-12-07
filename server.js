const express = require("express");
//const routes = require("./routes/index");
const db = require("./db/init-db");
const database = require("./db/database");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const marketDataRoutes = require("./routes/marketDataRoutes");
const config = require("./config.json");
const middlewares = require("./middlewares/index");

// create express app
const app = express();
app.use(express.json());
// setup middlewares
//middlewares(app);

// setup routes
//routes(app);

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", marketDataRoutes);
const PORT = 3000;


app.get('/api/wallet/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
      const result = await database.query('SELECT user_id, available_balance FROM public.member_wallet WHERE user_id = $1', [userId]);
      if (result.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Database query error" });
  }
});


// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
