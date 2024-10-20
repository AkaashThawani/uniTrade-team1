const express = require('express');
//const routes = require("./routes/index");
const categoryRoutes = require("./routes/categoryRoutes")
const config = require("./config.json");
const middlewares = require("./middlewares/index");

// create express app
const app = express();
app.use(express.json());
// setup middlewares
//middlewares(app);

// setup routes
//routes(app);

app.use('/api', categoryRoutes)

const PORT = 3000;
// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})