const db = require("../db/database");

const createProduct = async (req, res) => {
  const { product_name, category_id, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6 } = req.body;

  if (!product_name || !category_id || !description || !attribute1 || !attribute2 || !attribute3 || !attribute4 || !attribute5 || !attribute6) {
    return res.status(400).json({
      error: "Product name, category ID, description, and all attributes are required.",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Products (product_name, category_id, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [product_name, category_id, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6]
    );
    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when adding a new product.",
    });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await db.query("SELECT * FROM Products WHERE product_name = ?", [name]);
    if (rows.length === 0) {
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
  const { category_id, product_name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6 } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Product ID is required",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE Products 
       SET category_id = COALESCE(?, category_id), 
           product_name = COALESCE(?, product_name), 
           description = COALESCE(?, description),
           attribute1 = COALESCE(?, attribute1),
           attribute2 = COALESCE(?, attribute2),
           attribute3 = COALESCE(?, attribute3),
           attribute4 = COALESCE(?, attribute4),
           attribute5 = COALESCE(?, attribute5),
           attribute6 = COALESCE(?, attribute6) 
       WHERE product_id = ?`,
      [category_id, product_name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, id]
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
      error: "Error occurred when updating the product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Products WHERE product_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when deleting the product.",
    });
  }
};

module.exports = {
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
};
