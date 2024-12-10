const express = require("express");
const {
  createCategory,
  category,
  deactivateCategory,
  activeCategories,
  allCategories,
  updateCategory,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/category/:name", category);
router.put("/deactivateCategory/:category_id", deactivateCategory);
router.post("/category/:id", updateCategory);
router.get("/categoriesList", activeCategories);
router.get("/allCategories", allCategories);

module.exports = router;
