const { populate } = require("dotenv");
const OrderItem = require("../models/order-itemModel");
const Order = require("../models/OrderModel");

// post order
exports.postOrder = async (req, res) => {
  console.log("hell from post order");

  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    user,
    totalPrice,
  } = req.body;
  let orderItemsIds = Promise.all(
    orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.qty,
        product: orderItem._id,
      });
      newOrderItem = await newOrderItem.save();
      if (!newOrderItem) {
        return res.status(400).json({
          message: "Failed to save order item",
        });
      }
      return newOrderItem._id;
    })
  );

  let orderItemIdsResolved = await orderItemsIds;

  let order = await new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    method: "on cash",
    country,
    phone,
    totalPrice,
    user,
  });
  if (!order) {
    return res.status(400).json({
      message: "Failed to save order",
    });
  }
  order = await order.save();
  return res.status(200).json({
    message: "Order created successfully",
  });
};

//  orderlist
exports.orderList = async (req, res) => {
  let order = await Order.find()
    .populate("user", "name")
    .sort({ createdAt: -1 });
  if (!order) {
    return res.status(400).json({ error: "No orders found" });
  }

  return res.status(200).json(order);
};

// orderdetails
exports.orderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "Product",
        },
      });

    console.log("Populated Order:", order); // Check the populated order
    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// order list of specific user
exports.userOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({
      user: req.params.id,
      $or: [
        { method: "on cash" }, // Orders where the method is "on cash"
        { method: "esewa", status: "completed" }, // Orders where method is "esewa" and status is "completed"
      ],
    }).populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

    if (!userOrders || userOrders.length === 0) {
      return res.status(400).json({
        error: "No orders found for this user",
      });
    }

    return res.status(200).json(userOrders);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while fetching orders",
    });
  }
};
