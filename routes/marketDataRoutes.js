const express = require("express");
const {
  addMarketData,
  getAllMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
} = require("../controllers/marketDataController");

const router = express.Router();

router.post("/market-data", addMarketData);
router.get("/market-data/:id", getMarketDataById);
router.get("/market-data", getAllMarketData);
router.put("/market-data/:id", updateMarketData);
router.delete("/market-data/:id", deleteMarketData);

module.exports = router;
