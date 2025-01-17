const Product = require("../models/productModel");

// to post product
exports.postProduct = async (req, res) => {
  console.log(req.body);
  
  // Check if files are uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ error: "Please upload at least one file" });
  }

  // Extract file paths from uploaded files
  const imagePaths = req.files.map((file) => file.path);

  // Create new product with multiple image paths
  let product = new Product({
    product_name: req.body.product_name.toLowerCase(),
    product_price: req.body.product_price,
    countInStock: req.body.countInStock,
    product_description: req.body.product_description,
    product_image: imagePaths, // Storing multiple images
    category: req.body.category,
  });

  // Check if product data is valid
  if (!product) {
    return res.status(400).json({
      error: "Invalid product data",
    });
  }

  // Save the product to the database
  try {
    product = await product.save();
    return res.status(200).json({
      message: "Product saved successfully",
      product,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to save product",
      details: err.message,
    });
  }
};

// update product
exports.updateProduct = async (req, res) => {
  // Check if files are uploaded
  let newImagePaths = [];
  if (req.files && req.files.length > 0) {
    // If new images are uploaded, map the file paths
    newImagePaths = req.files.map((file) => file.path);
  }

  // Get the existing product from the database
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // If user wants to remove specific images
  if (req.body.imagesToRemove) {
    const imagesToRemove = req.body.imagesToRemove; // Array of image paths to remove
    product.product_image = product.product_images.filter(
      (image) => !imagesToRemove.includes(image)
    );
  }

  // If new images are uploaded, update the images array
  if (newImagePaths.length > 0) {
    // Add new images to the existing ones
    product.product_images.push(...newImagePaths);
  }

  // Update the rest of the product fields
  product.product_name = req.body.product_name.toLowerCase();
  product.product_price = req.body.product_price;
  product.countInStock = req.body.countInStock;
  product.product_description = req.body.product_description;
  product.category = req.body.category;

  // Save the updated product
  try {
    product = await product.save();
    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: product, // Return the updated product
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to update product",
      details: err.message,
    });
  }
};

// delete product by id
exports.deleteProduct = async (req, res) => {
  let product = await Product.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!product) {
    return res.status(400).json({
      error: "Product not found",
    });
  }

  return res.status(200).json({
    message: "Product deleted successfully",
  });
};

// get product list
exports.productList = async (req, res) => {
  let product = await Product.find();
  if (!product) {
    return res.status(400).json({
      error: "Product not found.",
    });
  }
  return res.status(200).json(product);
};

// get product details
exports.productDetails = async (req, res) => {
  let product = await Product.findById({
    _id: req.params.id,
  }).populate("category")
  if (!product) {
    return res.status(400).json({
      error: "Product not found",
    });
  }
  return res.status(200).json(product);
};
