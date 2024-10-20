const db = require('../db/database');


const createCategory = async(req, res) => {
   const {name, description} = req.body;

   if(!name){
    return res.status(400).json({
        error: "Category name is required"
    })
   }

   try {
    const [result] = await db.query(
        'INSERT INTO Categories (name, description) VALUES (?,?)',
        [name, description]
    );
    res.status(201).json({
        message: 'Category created successfully',
        categoryId: result.insertId
    });
   } catch (error) {
    console.log(error);
    res.status(500).json({
        error:"Error occurred when creating a Category."
    })
   }
};

module.exports = {createCategory}