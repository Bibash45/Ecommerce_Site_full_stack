const express = require("express");
const {
  postCategory,
  updateCategory,
  categoryList,
  deleteCategory,
  categoryDetails,
} = require("../controllers/categoryController");


const {
  requireSignin,
  requireAdmin,
} = require("../Endpoints middleware/endpointProtectoin");
const router = express.Router();

router.route("/postcategory").post(postCategory);

router.route("/updatecategory/:id").put(updateCategory);

router.route("/categorylist").get(requireSignin, requireAdmin, categoryList);

router
  .route("/categorydetails/:id")
  .get(requireSignin, requireAdmin, categoryDetails);

router.route("/deletecategory/:id").delete(deleteCategory);

module.exports = router;
