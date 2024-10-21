const db = require("../db/database");

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Categories (name, description) VALUES (?,?)",
      [name, description]
    );
    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when creating a Category.",
    });
  }
};

const category = async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await db.query("SELECT * FROM Categories WHERE name = ?", [
      name,
    ]);
    if (rows.length == 0) {
      return res.status(404).json({
        error: "Category does not exist.",
      });
    }
    res.status(200).json({
      category: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred. Unable to get category.",
    });
  }
};

const softDelete = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Categories SET isDeleted = TRUE... WHERE category_id = ?"[id]
    );
    if (result.affectedRows.length == 0) {
      return res.status(404).json({
        error: "Category not found.",
      });
    }
    res.status(200).json({
      message: "Category marked for deletion",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while attempting to delete category.",
    });
  }
};

module.exports = { category, createCategory, softDelete };
