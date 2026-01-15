const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

// @route   POST /api/subscribe
// @desc    Handle newsletter subscription
// @access  Public
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Valid email required" });
    }

    // Normalize email
    const normalized = email.trim().toLowerCase();

    // Check if already subscribed
    let subscriber = await Subscriber.findOne({ email: normalized });
    if (subscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Create new subscriber
    subscriber = new Subscriber({ email: normalized });
    await subscriber.save();

    res.status(201).json({
      message: "Successfully subscribed to the newsletter!",
      subscriber,
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
});


module.exports = router;
