const express = require("express");
const {
  createCategory,
  category,
  softDelete,
  update,
  deactivateCategory,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/category/:name", category);
router.put("/delete/:category_id", deactivateCategory);
router.put("/category/:id", update);

module.exports = router;
