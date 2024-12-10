const express = require("express");
const {
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getActiveProducts,
  getProductsWithCategory,  // Import the new API
} = require("../controllers/productController");

const router = express.Router();

// Routes for product-related actions
router.post("/products", createProduct);
router.get("/product/:name", getProductByName);
router.post("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);  // Use DELETE for deleting a product

router.get("/products", getAllProducts);
router.get("/activeProduct", getActiveProducts);
router.get("/productWithCategory", getProductsWithCategory);  // New route for getting products with category

module.exports = router;
