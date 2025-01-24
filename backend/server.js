const express = require("express");
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// import route from Routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

const app = express();

// connect db
connectDB();

const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/public/uploads", express.static("public/uploads"));
app.use("/public/profile_default", express.static("public/profile_default"));

// router for user
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

// routes for esewa payment
app.use("/api", paymentRoute);

app.listen(port, (req, res) => {
  console.log(`Server is running on port: ${port}`);
});
