import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import { seedInitialProducts } from "./service/productService.js";

const app = express();
const PORT = 3000;

app.use(express.json());


mongoose
  .connect( process.env.MONGO_URL || "")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error(err));

// Seed initial products if the collection is empty
seedInitialProducts();  

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});