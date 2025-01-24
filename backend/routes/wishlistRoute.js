const express = require("express");

const {
  postWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");

const { requireSignin } = require("../Endpoints middleware/endpointProtectoin");
const router = express.Router();

router.route("/wishlist").post(requireSignin, postWishlist);
router.route("/wishlist/:userId").get(requireSignin, getWishlist);
router.route("/wishlist/:userId/:productId").delete(requireSignin, deleteWishlist);

module.exports = router;
