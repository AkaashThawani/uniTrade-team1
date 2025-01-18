const express = require("express");
const {
  addMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
  getHistoricMarketDataRange,
  getLiveMarketData
} = require("../controllers/marketDataController");

const router = express.Router();

router.post("/marketData", addMarketData);
router.get("/marketData/:id", getMarketDataById);
router.get("/liveData", getLiveMarketData);
router.put("/marketData/:id", updateMarketData);
router.delete("/marketData/:id", deleteMarketData);
router.get('/historicData', getHistoricMarketDataRange);

module.exports = router;
