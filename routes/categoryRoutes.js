const express = require("express");
const {
  createCategory,
  category,
  softDelete,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.post("/categories", createCategory);
router.get("/category/:name", category);
router.put("/delete/:id", softDelete);

module.exports = router;
