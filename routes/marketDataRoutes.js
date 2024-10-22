const {
  createMarketData,
  getAllMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
} = require("../controllers/marketDataController");

const router = express.Router();

router.post("/market-data", createMarketData);
router.get("/market-data/:id", getMarketDataById);
router.post("/market-data", getAllMarketData);
router.put("/market-data/:id", updateMarketData);
router.delete("/market-data/:id", deleteMarketData);

module.exports = router;
