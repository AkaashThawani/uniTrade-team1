const express = require("express");
const {
  addMarketData,
  getAllMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
} = require("../controllers/marketDataController");

const router = express.Router();

router.post("/marketData", addMarketData);
router.get("/marketData/:id", getMarketDataById);
router.get("/allMarketData", getAllMarketData);
router.put("/marketData/:id", updateMarketData);
router.delete("/marketData/:id", deleteMarketData);

module.exports = router;
