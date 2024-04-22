const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 6001;
const jwt = require("jsonwebtoken");
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const verifyToken = require("./api/middleware/verifyToken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentRoutes = require("./api/routes/paymentRoutes");


// middleware
app.use(cors());
app.use(express.json());

// connect to mongodb server
// mayank04
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ndfbzx5.mongodb.net/demo-foodie-db2?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(console.log("Connected to mongodb server"))
  .catch((error) => console.log(error));

// jwt authentication
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// verify jwt token
// middleware

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;
  const amount = price * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  } catch (error) {
    res.status(500).json(error);

  }
});





app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
