const express = require("express");
const Product = require("../models/productModel");
const Order = require("../models/OrderModel");
const OrderItem = require("../models/order-itemModel");
const Payment = require("../models/paymentModel");
const { getEsewaPaymentHash, verifyEsewaPayment } = require("../utils/esewa");

// Initialize eSewa Payment
const initializeEsewa = async (req, res) => {
  try {
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

    // Validate products
    const productValidate = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item._id);

        if (!product || product.countInStock < item.qty) {
          throw new Error(
            `Product ${item.product} is unavailable or out of stock.`
          );
        } else {
          return item;
        }
      })
    );

    // create order
    let orderItemsIds = Promise.all(
      orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.qty,
          product: orderItem._id,
        });
        newOrderItem = await newOrderItem.save();
        console.log("orderItem created....");

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
      shippingAddress1: shippingAddress1,
      shippingAddress2: shippingAddress2,
      city: city,
      status: "pending",
      method: "esewa",
      zip: zip,
      country: country,
      phone: phone,
      totalPrice: totalPrice,
      user: user,
    });
    if (!order) {
      return res.status(400).json({
        message: "Failed to save order",
      });
    }
    order = await order.save();
    console.log("order created successfully");

    // Generate eSewa payment hash
    const paymentHash = await getEsewaPaymentHash({
      amount: totalPrice,
      transaction_uuid: order._id.toString(),
    });

    res.json({
      success: true,
      order,
      payment: paymentHash,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Complete eSewa Payment
const completeEsewa = async (req, res) => {
  const { data } = req.query;
  try {
    const paymentInfo = await verifyEsewaPayment(data);

    const orderId = paymentInfo.response.transaction_uuid;

    // Find the order
    const order = await Order.findById(orderId);
    console.log("order data : ", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Record the payment
    const paymentData = await Payment.create({
      transactionId: paymentInfo.decodedData.transaction_code,
      pidx: paymentInfo.decodedData.transaction_code,
      orderId: order._id,
      amount: order.totalPrice,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "esewa",
      status: "success",
    });

    if (!paymentData) {
      return res.status(500).json({
        success: false,
        error: "Failed to create payment record",
      });
    }
    console.log("payment recorded........");

    // Update order status to "completed"
    order.status = "completed";
    await order.save();

    console.log("order status updated.....");

    res.send(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Successful</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 font-sans">
          <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
              <div class="flex justify-center mb-4">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11.25l3 3 7-7M21 12.75c0-4.06-3.24-7.25-7.25-7.25-2.58 0-4.88 1.4-6.12 3.44L10.12 5.44a7.75 7.75 0 0 0-4.94-1.44C3.24 4 0 7.24 0 11.25c0 4.06 3.24 7.25 7.25 7.25 2.58 0 4.88-1.4 6.12-3.44l2.72 2.72A7.23 7.23 0 0 0 21 12.75z" />
                </svg>
              </div>
              <h1 class="text-3xl font-semibold text-gray-800 text-center mb-4">Payment Successful</h1>
              <p class="text-lg text-gray-600 text-center mb-6">Thank you for your order. Your payment has been successfully processed. You will receive an email confirmation shortly.</p>
              <div class="flex justify-center gap-4">
                <a href="${process.env.FRONTEND_URI}/" class="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">
                  Back to Home
                </a>
                <a href="/orders" class="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
                  View Orders
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const FailedUrl = (req, res) => {
  res.send(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Failed</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 font-sans">
        <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-pink-500 to-yellow-600">
          <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <div class="flex justify-center mb-4">
              <svg class="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h1 class="text-3xl font-semibold text-gray-800 text-center mb-4">Payment Failed</h1>
            <p class="text-lg text-gray-600 text-center mb-6">Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.</p>
            <div class="flex justify-center gap-4">
              <a href="/" class="bg-red-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-700 transition duration-300">
                Back to Home
              </a>
              <a href="/retry-payment" class="bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-yellow-700 transition duration-300">
                Retry Payment
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
};

module.exports = { initializeEsewa, completeEsewa, FailedUrl };
