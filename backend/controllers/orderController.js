const { populate } = require("dotenv");
const OrderItem = require("../models/order-itemModel");
const Order = require("../models/OrderModel");

// post order
exports.postOrder = async (req, res) => {
  let orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
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

  let totalAmount = await Promise.all(
    orderItemIdsResolved.map(async (orderId) => {
      let itemOrder = await OrderItem.findById(orderId).populate(
        "product",
        "product_price"
      );

      const total = itemOrder.quantity * itemOrder.product.product_price;
      return total;
    })
  );

  const TotalPrice = totalAmount.reduce((acc, item) => acc + item, 0);

  let order = await new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    totalPrice: TotalPrice,
    user: req.body.user,
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

// orderlist
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
  let order = await Order.findById({
    _id: req.params.id,
  });
  if (!order) {
    return res.status(400).json({ error: "Order not found" });
  }
  return res.status(200).json(order);
};

// order list of specific user
exports.userOrders = async (req, res) => {
  let userOrders = await Order.find({
    user: req.params.id,
  }).populate({
    path: "orderItems",
    populate: {
      path: "product",
      populate: "category",
    },
  });
  if (!userOrders) {
    return res.stauts(400).json({
      error: "No orders found for this user",
    });
  }
  return res.status(200).json(userOrders);
};
