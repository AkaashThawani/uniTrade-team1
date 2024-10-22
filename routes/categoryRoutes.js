const express = require("express");
const {
  createCategory,
  category,
  update,
  deactivateCategory,
} = require("../controllers/CategoryControllers");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/category/:name", category);
router.put("/deactivateCategory/:category_id", deactivateCategory);
router.put("/category/:id", update);

module.exports = router;
