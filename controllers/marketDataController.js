const db = require("../db/database");

const createMarketData = async (req, res) => {
  const { product_id, timestamp, price, volume } = req.body;

  if (!product_id || !timestamp || !price || !volume) {
    return res.status(400).json({
      error: "Product ID, timestamp, price, and volume are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO MarketData (product_id, timestamp, price, volume) VALUES (?, ?, ?, ?)",
      [product_id, timestamp, price, volume]
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

const updateMarketData = async (req, res) => {
  const { id } = req.params;
  const { product_id, timestamp, price, volume } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Market data ID is required",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE MarketData SET product_id = COALESCE(?, product_id), timestamp = COALESCE(?, timestamp), price = COALESCE(?, price), volume = COALESCE(?, volume) WHERE id = ?",
      [product_id, timestamp, price, volume, id]
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
    const [result] = await db.query("DELETE FROM MarketData WHERE id = ?", [
      id,
    ]);

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

const getMarketDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM MarketData WHERE id = ?", [
      id,
    ]);

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

module.exports = {
  createMarketData,
  getAllMarketData,
  getMarketDataById,
  updateMarketData,
  deleteMarketData,
};
