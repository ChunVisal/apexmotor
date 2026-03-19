// server/index.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import stripeRoutes from "./stripeRoutes.js";

// Get __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", stripeRoutes);

app.get("/", (_req, res) => {
  res.send("✅ Backend running...");
});

app.post("/save-order", async (req, res) => {
  try {
    const order = req.body;
    const filePath = path.join(process.cwd(), "orders.json");

    let existing = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      existing = JSON.parse(content);
    }

    existing.push(order);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    console.log("✅ Order saved to file.");
    res.json({ message: "Saved" });
  } catch (err) {
    console.error("❌ Failed to save order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
