const mongoose = require("mongoose");
const Category = require("../models/categoryModel");


// post category
exports.postCategory = async (req, res) => {
  let category = await Category.findOne({
    category_name: req.body.category_name.toLowerCase(),
  });
  if (category) {
    return res.status(400).json({
      message: "Category already exist",
    });
  }
  category = await new Category({
    category_name: req.body.category_name.toLowerCase(),
  });
  if (!category) {
    return res.status(400).json({
      message: "Category not created",
    });
  }
  await category.save();
  return res.status(200).json({
    message: "Category created successfully",
  });
};

// update category
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    const existingCategory = await Category.findOne({
      category_name: req.body.category_name.toLowerCase(),
    });

    if (existingCategory) {
      return res.status(400).json({
        error: "Category already exists",
      });
    }

    category.category_name = req.body.category_name.toLowerCase();

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// get category list
exports.categoryList = async (req, res) => {
  const category = await Category.find();
  if (!category) {
    return res.status(400).json({
      error: "Category not found",
    });
  }
  return res.status(200).json(category);
};

// get category by id
exports.categoryDetails = async (req, res) => {
  const category = await Category.findById({
    _id: req.params.id,
  });
  if (!category) {
    return res.status(404).json({
      error: "Category not found",
    });
  }

  return res.status(200).json(category);
};

// delete category
exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!category) {
    return res.status(400).json({
      error: "Category not found",
    });
  }
  return res.status(200).json({
    message: "Category deleted successfully",
  });
};
