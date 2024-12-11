const express = require("express");
const {
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getActiveProducts,
  getProductsWithCategory,
  getProductCategoryWise,// Import the new API
} = require("../controllers/productController");

const router = express.Router();

// Routes for product-related actions
router.post("/products", createProduct);
router.get("/product/:name", getProductByName);
router.post("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);  // Use DELETE for deleting a product

router.get("/products", getAllProducts);
router.get("/activeProduct", getActiveProducts);
router.get("/productWithCategory", getProductsWithCategory);
router.get("/productCategoryWise", getProductCategoryWise); // Add this route

module.exports = router;
