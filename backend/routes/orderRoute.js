const express = require("express");

const router = express.Router();

// import controller
const {
  postOrder,
  orderList,
  userOrders,
  orderDetails,
} = require("../controllers/orderController");
const {
  requireSignin,
  requireUser,
  requireAdmin,
} = require("../Endpoints middleware/endpointProtectoin");

// post order
router.route("/postorder").post(requireSignin, requireUser, postOrder);

// order list
router.route("/orderlist").get(requireSignin, requireAdmin, orderList);

// orderdetails by id
router
  .route("/orderdetails/:id")
  .get(requireSignin, requireAdmin, orderDetails);

// order list by userId
router.route("/userorders/:id").get(requireSignin, requireAdmin, userOrders);

module.exports = router;
