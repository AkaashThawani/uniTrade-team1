const express = require("express");
const {
  createCategory,
  category,
  update,
  deactivateCategory,
  activeCategories,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/category/:name", category);
router.put("/deactivateCategory/:category_id", deactivateCategory);
router.put("/category/:id", update);
router.get("/categoriesList", activeCategories);

module.exports = router;
