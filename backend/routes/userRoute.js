const express = require("express");

// import validation
const { validation } = require("../validator/index");
const {
  userValidation,
  passwordValidation,
} = require("../validator/validation");

const router = express.Router();

// import controller
const {
  postUser,
  postEmailConfirmation,
  signin,
  forgotPassword,
  resetPassword,
  userList,
  userDetails,
  logout,
} = require("../controllers/userController");
const {
  requireSignin,
  requireAdmin,
  requireUser,
} = require("../Endpoints middleware/endpointProtectoin");

// route for user
router
  .route("/register")
  .post(userValidation, passwordValidation, validation, postUser);
router.route("/confirmation/:token").post(postEmailConfirmation);
router.route("/login").post(passwordValidation, signin);
router.route("/logout").post(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").post(resetPassword);

router.route("/userlist").get(requireSignin, requireAdmin, userList);

router.route("/userdetails/:id").get(requireSignin, requireAdmin, userDetails);

module.exports = router;
