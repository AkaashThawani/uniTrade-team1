const db = require("../db/database");

const addMarketData = async (req, res) => {
  const { product_id, best_buy_price, best_sell_price, best_buy_volume, best_sell_volume, type, sold_at } = req.body;

  if (!product_id || best_buy_price === undefined || best_sell_price === undefined || best_buy_volume === undefined || best_sell_volume === undefined || !type) {
    return res.status(400).json({
      error: "Product ID, best buy price, best sell price, best buy volume, best sell volume, and type are required.",
    });
  }

  if (!["buy", "sell"].includes(type)) {
    return res.status(400).json({
      error: "Invalid type. Must be either 'buy' or 'sell'.",
    });
  }

  try {
    const [product] = await db.query("SELECT product_id FROM Products WHERE product_id = ?", [product_id]);
    if (product.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const formattedSoldAt = sold_at ? new Date(sold_at).toISOString().slice(0, 19).replace("T", " ") : null;

    const [result] = await db.query(
      `INSERT INTO MarketData (product_id, best_buy_price, best_sell_price, best_buy_volume, best_sell_volume, type, created_at, sold_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [product_id, best_buy_price, best_sell_price, best_buy_volume, best_sell_volume, type, createdAt, formattedSoldAt]
    );

    res.status(201).json({
      message: "Market data created successfully",
      marketDataId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when creating market data.",
    });
  }
};

const getAllMarketData = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM MarketData");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when fetching market data.",
    });
  }
};

const getMarketDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM MarketData WHERE market_id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Market data not found",
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when fetching the market data.",
    });
  }
};

const updateMarketData = async (req, res) => {
  const { id } = req.params;
  const { product_id, best_buy_price, best_sell_price, best_buy_volume, best_sell_volume, type, sold_at } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Market data ID is required",
    });
  }

  if (type && !["buy", "sell"].includes(type)) {
    return res.status(400).json({
      error: "Invalid type. Must be either 'buy' or 'sell'.",
    });
  }

  try {
    const formattedSoldAt = sold_at ? new Date(sold_at).toISOString().slice(0, 19).replace("T", " ") : null;

    const [result] = await db.query(
      `UPDATE MarketData 
       SET product_id = COALESCE(?, product_id), 
           best_buy_price = COALESCE(?, best_buy_price),
           best_sell_price = COALESCE(?, best_sell_price),
           best_buy_volume = COALESCE(?, best_buy_volume),
           best_sell_volume = COALESCE(?, best_sell_volume),
           type = COALESCE(?, type),
           sold_at = COALESCE(?, sold_at)
       WHERE market_id = ?`,
      [product_id, best_buy_price, best_sell_price, best_buy_volume, best_sell_volume, type, formattedSoldAt, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Market data not found or no changes were made",
      });
    }

    res.status(200).json({
      message: "Market data updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when updating market data.",
    });
  }
};

const deleteMarketData = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM MarketData WHERE market_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Market data not found",
      });
    }

    res.status(200).json({
      message: "Market data deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when deleting market data.",
    });
  }
};

module.exports = {
  addMarketData,
  getAllMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
};
