// server/stripeRoutes.js
import express from "express";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Save order manually (used if not using webhook)
router.post("/save-order", async (req, res) => {
  try {
    const order = req.body;
    const filePath = path.join(process.cwd(), "orders.json");

    let existing = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      existing = JSON.parse(content);
    }

    existing.push({ ...order, id: uuidv4(), createdAt: new Date().toISOString() });

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    console.log("✅ Order saved to file.");
    res.json({ message: "Saved" });
  } catch (err) {
    console.error("❌ Failed to save order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Stripe Checkout
router.post("/create-checkout-session", async (req, res) => {
  console.log("Stripe Checkout Request:", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      customer_email: req.body.email,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout Session Error:", err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Stripe webhook (optional for real-time confirm)
router.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment received for:", session.amount_total / 100, "USD");
  }

  res.sendStatus(200);
});

export default router;
