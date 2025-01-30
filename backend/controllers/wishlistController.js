const Wishlist = require("../models/wishlishModel");

exports.postWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist for the user if it doesn't exist
      wishlist = new Wishlist({ userId, products: [] });
    }

    // Check if the product is already in the wishlist
    const alreadyInWishlist = wishlist.products.some(
      (item) => item.productId.toString() === productId
    );

    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add product to the wishlist
    wishlist.products.push({ productId });
    await wishlist.save();

    res.status(201).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId"
    );
    if (!wishlist) {
      return res.status(200).json([]);
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let wishlist = await Wishlist.findOne({ userId });
    console.log(wishlist);
    

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== productId
    );
    console.log(wishlist);

    await wishlist.save();

    res
      .status(200)
      .json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
