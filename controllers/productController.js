const db = require("../db/database");

const createProduct = async (req, res) => {
  const { productName, category, description, attribute1, attribute2, attribute3, attribute4, status } = req.body;

  if (!productName || !category || !description || !attribute1 || !attribute2 || !attribute3 || !attribute4 || !status) {
    return res.status(400).json({
      error: "Product name, category ID, description, and all attributes are required.",
    });
  }

  try {
    // Check if category exists and is active
    const categoryResult = await db.query('SELECT * FROM product_category WHERE category_id = $1 AND status = $2', [category, 'A']);
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        error: "Category does not exist or is not active.",
      });
    }

    const result = await db.query(
      "INSERT INTO product (product_name, category_id, description, attribute1, attribute2, attribute3, attribute4, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING product_id",
      [productName, category, description, attribute1, attribute2, attribute3, attribute4, status]
    );

    res.status(201).json({
      message: "Product created successfully",
      productId: result.rows[0].product_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error occurred when adding a new product.",
    });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await db.query("SELECT * FROM product WHERE product_name = $1", [name]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product does not exist.",
      });
    }

    const product = result.rows[0];
    // Fetch category details for the product
    const categoryResult = await db.query('SELECT category_name, status FROM product_category WHERE category_id = $1', [product.category_id]);

    product.categoryName = categoryResult.rows[0].category_name;
    product.categoryStatus = categoryResult.rows[0].status === 'A' ? 'Active' : 'Inactive';

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred. Unable to get product.",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category, product_name, description, attribute1, attribute2, attribute3, attribute4, status } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Product ID is required",
    });
  }

  try {
    // Check if category exists and is active
    category_id = category

    const categoryResult = await db.query('SELECT * FROM product_category WHERE category_id = $1 AND status = $2', [category_id, 'A']);
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        error: "Category does not exist or is not active.",
      });
    }

    const result = await db.query(
      `UPDATE product 
       SET category_id = COALESCE($1, category_id), 
           product_name = COALESCE($2, product_name), 
           description = COALESCE($3, description),
           attribute1 = COALESCE($4, attribute1),
           attribute2 = COALESCE($5, attribute2),
           attribute3 = COALESCE($6, attribute3),
           attribute4 = COALESCE($7, attribute4),
           status = COALESCE($8, status) 
       WHERE product_id = $9 RETURNING product_id`,
      [category_id, product_name, description, attribute1, attribute2, attribute3, attribute4, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Product not found or no changes were made",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      productId: result.rows[0].product_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error occurred when updating the product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM product WHERE product_id = $1 RETURNING product_id", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      productId: result.rows[0].product_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error occurred when deleting the product.",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product");
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No products found.",
      });
    }

    const formattedProducts = rows.map(formatProduct);
    res.status(200).json({
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving products.",
    });
  }
};

const getActiveProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product WHERE status = 'A'"); // Assuming 'A' represents active status
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No active products found.",
      });
    }
    const formattedProducts = result.rows.map(formatProduct);
    res.status(200).json({
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving active products.",
    });
  }
};

const formatProduct = (product) => {
  return {
    id: product.product_id,
    name: product.product_name,
    description: product.description,
    categoryId: product.category_id,
    categoryName: product.category_name, // Assuming category_name is fetched properly
    attributes: {
      attribute1: product.attribute1,
      attribute2: product.attribute2,
      attribute3: product.attribute3,
      attribute4: product.attribute4,
    },
    status: product.status === 'A' ? 'Active' : 'Inactive',
  };
};

const getProductsWithCategory = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        p.product_id, 
        p.product_name, 
        p.description, 
        p.category_id, 
        c.category_name, 
        c.attribute1 AS category_attribute1_key, 
        c.attribute2 AS category_attribute2_key, 
        c.attribute3 AS category_attribute3_key, 
        c.attribute4 AS category_attribute4_key, 
        p.attribute1 AS product_attribute1_value, 
        p.attribute2 AS product_attribute2_value, 
        p.attribute3 AS product_attribute3_value, 
        p.attribute4 AS product_attribute4_value, 
        p.status
      FROM product p
      JOIN product_category c ON p.category_id = c.category_id
    `);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No products found.",
      });
    }

    const formattedProductsWithCategory = rows.map((product) => {
      return {
        id: product.product_id,
        name: product.product_name,
        description: product.description,
        categoryId: product.category_id,
        categoryName: product.category_name,
        attributes: {
          attribute1: {
            key: product.category_attribute1_key,
            value: product.product_attribute1_value,
          },
          attribute2: {
            key: product.category_attribute2_key,
            value: product.product_attribute2_value,
          },
          attribute3: {
            key: product.category_attribute3_key,
            value: product.product_attribute3_value,
          },
          attribute4: {
            key: product.category_attribute4_key,
            value: product.product_attribute4_value,
          },
        },
        status: product.status === 'A' ? 'Active' : 'Inactive',
      };
    });

    res.status(200).json({
      products: formattedProductsWithCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving products with categories.",
    });
  }
};

const getProductCategoryWise = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        c.category_id, 
        c.category_name,
        c.attribute1, 
        c.attribute2, 
        c.attribute3, 
        c.attribute4,
        p.product_id, 
        p.product_name, 
        p.description, 
        p.attribute1 AS product_attribute1_value, 
        p.attribute2 AS product_attribute2_value, 
        p.attribute3 AS product_attribute3_value, 
        p.attribute4 AS product_attribute4_value, 
        p.status
      FROM product_category c
      LEFT JOIN product p ON c.category_id = p.category_id
    `);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No products or categories found.",
      });
    }

    // Group products by category
    const categoryWiseProducts = rows.reduce((acc, row) => {
      if (!acc[row.category_id]) {
        acc[row.category_id] = {
          id: row.category_id,
          name: row.category_name,
          attributeKeys: {
            attribute1: row.attribute1,
            attribute2: row.attribute2,
            attribute3: row.attribute3,
            attribute4: row.attribute4,
          },
          products: [],
        };
      }

      // If a product exists for the category, add it to the products array
      if (row.product_id) {
        acc[row.category_id].products.push({
          id: row.product_id,
          name: row.product_name,
          description: row.description,
          attributes: {
            [acc[row.category_id].attributeKeys.attribute1]: row.product_attribute1_value,
            [acc[row.category_id].attributeKeys.attribute2]: row.product_attribute2_value,
            [acc[row.category_id].attributeKeys.attribute3]: row.product_attribute3_value,
            [acc[row.category_id].attributeKeys.attribute4]: row.product_attribute4_value,
          },
          status: row.status === "A" ? "Active" : "Inactive",
        });
      }

      return acc;
    }, {});

    res.status(200).json({
      categories: Object.values(categoryWiseProducts),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving category-wise products.",
    });
  }
};

module.exports = {
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getActiveProducts,
  getProductsWithCategory,
  getProductCategoryWise
};