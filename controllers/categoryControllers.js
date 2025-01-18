const db = require("../db/database");

// Get all active categories
const formatCategory = (category) => {
  return {
    id: category.category_id,
    categoryName: category.category_name,
    attributes: {
      attribute1: category.attribute1,
      attribute2: category.attribute2,
      attribute3: category.attribute3,
      attribute4: category.attribute4,
    },
    description: category.description,
    status: category.status === 'A' ? 'Active' : 'Inactive', // Adjust the status representation
  };
};

// Get active categories
const activeCategories = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM product_category WHERE status = $1',
      ['A'] // Assuming 'A' represents the active status
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No active categories found.",
      });
    }

    const formattedCategories = result.rows.map(formatCategory);

    res.status(200).json({
      categories: formattedCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving active categories.",
    });
  }
};

// Get all categories
const allCategories = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product_category');
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No categories found.",
      });
    }

    const formattedCategories = result.rows.map(formatCategory);

    res.status(200).json({
      categories: formattedCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving categories.",
    });
  }
};

// Create a new category with attributes
const createCategory = async (req, res) => {
  const { name, description, attribute1, attribute2, attribute3, attribute4, status } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Category name is required",
    });
  }


  try {
    // Check if the category name already exists
    const existingCategory = await db.query(
      "SELECT * FROM product_category WHERE LOWER(category_name) = $1",
      [name]
    );

    if (existingCategory.rows.length > 0) {
      return res.status(409).json({
        error: `Category with name '${name}' already exists.`,
      });
    }

    // Insert the new category
    await db.query(
      "INSERT INTO product_category (category_name, description, attribute1, attribute2, attribute3, attribute4, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, description, attribute1, attribute2, attribute3, attribute4, status]
    );

    res.status(201).json({
      message: "Category created successfully",
      status: "success",
    });
  } catch (error) {
    console.error(error);
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
      'SELECT * FROM "product_category" WHERE "category_name" = $1 AND "status" = $2',
      [name, 'A'] // Use a proper boolean value for comparison
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
      "UPDATE product_category SET status = $1 WHERE id = $1",
      ['I', id]
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
const updateCategory = async (req, res) => {
  const { id, name, discription, attribute1, attribute2, attribute3, attribute4, status } = req.body;
  console.log(req.body);
  if (!id || !name) {
    return res.status(400).json({
      error: "Category ID and name are required.",
    });
  }

  try {
    // First, check if the updated name already exists
    const result = await db.query(
      "SELECT * FROM product_category WHERE category_name = $1 AND category_id != $2",
      [name, id] // Ensure to exclude the current category by id
    );

    if (result.rows.length > 0) {
      return res.status(400).json({
        error: "Category with this name already exists.",
      });
    }

    const updateResult = await db.query(
      "UPDATE product_category SET category_name = $1, description = $2, attribute1 = $3, attribute2 = $4, attribute3 = $5, attribute4 = $6 , status = $7 WHERE category_id = $8",
      [name, discription, attribute1, attribute2, attribute3, attribute4, status, id]
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
  activeCategories,
  category,
  createCategory,
  deactivateCategory,
  updateCategory,
  allCategories
};
