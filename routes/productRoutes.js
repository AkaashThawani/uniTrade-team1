const express = require("express");
const {
  product,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/products", createProduct);
router.get("/product/:name", product);
router.put("/product/:id", updateProduct);

module.exports = router;
