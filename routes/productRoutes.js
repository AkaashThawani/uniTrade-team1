const express = require("express");
const {
  deleteProduct,
  createProduct,
  updateProduct,
  getProductByName,
} = require("../controllers/productController");

const router = express.Router();

router.post("/products", createProduct);
router.get("/product/:name", getProductByName);
router.put("/product/:id", updateProduct);
router.post("/deleteProduct", deleteProduct);

module.exports = router;
