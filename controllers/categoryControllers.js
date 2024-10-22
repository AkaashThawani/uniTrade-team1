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
    const [rows] = await db.query(
      "SELECT * FROM Categories WHERE name = ? AND isDeleted = FALSE", // prevents soft deleted categories from being returned
      [name]
    );
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

const deactivateCategory = async (req, res) => {
  try {
    console.log(req);
    const { id } = req.body.id;
    const [result] = await db.query(
      "UPDATE Categories SET isDeleted = TRUE WHERE id = ?",
      [id]
    );
    if (result.affectedRows.length == 0) {
      return res.status(404).json({
        error: "Category not found.",
      });
    }
    res.status(200).json({
      message: "Category marked for deactivation",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while attempting to deactivate category.",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id, name } = req.body;

    //first, we check if the updated name already exists
    const [categoryExists] = await db.query(
      "SELECT category WHERE name = ?"[(name, id)]
    );

    if (categoryExists && categoryExists.length > 0) {
      return res.status(400).json({
        error: "Category with this name already exists.",
      });
    }

    const [result] = await db.query(
      "UPDATE Categories SET name = ? WHERE category_id = ?"[(name, id)]
    );
    if (result.affectedRows.length == 0) {
      return res.status(404).json({
        error: "Category not found.",
      });
    }
    res.status(200).json({
      message: "Category updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while attempting to update the category.",
    });
  }
};

module.exports = { category, createCategory, deactivateCategory, update };
