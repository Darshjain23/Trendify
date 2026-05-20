const express = require("express");
const Orders = require("./orders.model");
const User = require("../users/user.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

// Generate unique order ID helper
const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
};

// Create a new order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { products, amount } = req.body;
    
    if (!products || products.length === 0) {
      return res.status(400).send({ message: "Cart cannot be empty for placing an order" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const newOrder = new Orders({
      orderId: generateOrderId(),
      email: user.email,
      userId: req.userId,
      products,
      amount,
      status: "Order Placed"
    });

    const savedOrder = await newOrder.save();
    res.status(201).send({
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send({ message: "Failed to place order" });
  }
});

// Get all orders (Admin only)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const allOrders = await Orders.find().sort({ createdAt: -1 });
    res.status(200).send(allOrders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

// Get user orders by email
router.get("/user/:email", verifyToken, async (req, res) => {
  try {
    const { email } = req.params;
    
    // Safety check: ensure user is fetching their own orders unless admin
    if (req.role !== "admin") {
      const user = await User.findById(req.userId);
      if (!user || user.email !== email) {
        return res.status(403).send({ message: "Unauthorized access to order logs" });
      }
    }

    const userOrders = await Orders.find({ email }).sort({ createdAt: -1 });
    res.status(200).send(userOrders);
  } catch (error) {
    console.error("Error fetching user orders", error);
    res.status(500).send({ message: "Failed to fetch user orders" });
  }
});

// Update order delivery status (Admin only)
router.patch("/update-status/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ["Order Placed", "Packed", "Shipped", "Out For Delivery", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid delivery status value" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

module.exports = router;
