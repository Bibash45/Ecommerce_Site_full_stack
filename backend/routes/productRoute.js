const express = require("express");

const router = express.Router();
// import middleware
const upload = require("../middleware/fileupload");
// import controller
const {
  postProduct,
  updateProduct,
  deleteProduct,
  productList,
  productDetails,
} = require("../controllers/productController");
const {
  requireSignin,
  requireUser,
  requireAdmin,
} = require("../Endpoints middleware/endpointProtectoin");

// post
router
  .route("/postproduct")
  .post(
    upload.array("product_image", 5),
    requireSignin,
    requireAdmin,
    postProduct
  );

// update
router
  .route("/updateproduct/:id")
  .post(
    upload.array("product_image", 5),
    requireSignin,
    requireAdmin,
    updateProduct
  );

// delete
router
  .route("/deleteproduct/:id")
  .delete(requireSignin, requireAdmin, deleteProduct);

// product list
router.route("/productlist").get(productList);

// product details
router.route("/productdetails/:id").get(productDetails);

module.exports = router;
