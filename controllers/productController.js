const db = require("../db/database");

const createProduct = async (req, res) => {
  const { name, category_id, price, stock_quantity } = req.body;

  if (!name || !category_id) {
    return res.status(400).json({
      error: "Category name and associated category are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Products (name, category_id, price, stock_quantity) VALUES (?,?,?,?)",
      [name, category_id, price, stock_quantity]
    );
    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when adding a new Product",
    });
  }
};

// Returns a product using a valid product name
const product = async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await db.query("SELECT * FROM Products WHERE name = ?", [
      name,
    ]);
    if (rows.length == 0) {
      return res.status(404).json({
        error: "Product does not exist.",
      });
    }
    res.status(200).json({
      product: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred. Unable to get product.",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, name, price, stock_quantity } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Product ID is required",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE Products SET category_id = COALESCE(?, category_id), name = COALESCE(?, name), price = COALESCE(?, price), stock_quantity = COALESCE(?, stock_quantity) WHERE id = ?",
      [category_id, name, price, stock_quantity, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found or no changes were made",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when updating the Product.",
    });
  }
};

module.exports = {
  createProduct,
  product,
  updateProduct,
};
