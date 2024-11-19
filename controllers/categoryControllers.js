const db = require("../db/database");

// Create a new category with attributes
const createCategory = async (req, res) => {
  const { name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6 } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO Categories (category_name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6]
    );
    res.status(201).json({
      message: "Category created successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred when creating a Category.",
    });
  }
};

// Returns a category using a valid category name
const category = async (req, res) => {
  try {
    const { name } = req.params;

    // Fixed the typo in `false` and adjusted query for boolean column
    const result = await db.query(
      'SELECT * FROM "Categories" WHERE "category_name" = $1 AND "isDeleted" = $2',
      [name, false] // Use a proper boolean value for comparison
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category does not exist.",
      });
    }

    res.status(200).json({
      category: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred. Unable to get category.",
    });
  }
};

// Soft deletes a category
const deactivateCategory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Category ID is required.",
    });
  }

  try {
    const result = await db.query(
      "UPDATE Categories SET isDeleted = 1 WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
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

// Allows updates/changes to category name and attributes
const update = async (req, res) => {
  const { id, name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6 } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: "Category ID and name are required.",
    });
  }

  try {
    // First, check if the updated name already exists
    const result = await db.query(
      "SELECT * FROM Categories WHERE name = $1 AND id != $2",
      [name, id] // Ensure to exclude the current category by id
    );

    if (result.rows.length > 0) {
      return res.status(400).json({
        error: "Category with this name already exists.",
      });
    }

    const updateResult = await db.query(
      "UPDATE Categories SET name = $1, description = $2, attribute1 = $3, attribute2 = $4, attribute3 = $5, attribute4 = $6, attribute5 = $7, attribute6 = $8 WHERE id = $9",
      [name, description, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, id]
    );

    if (updateResult.rowCount === 0) {
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

module.exports = {
  category,
  createCategory,
  deactivateCategory,
  update,
};
